import { Resend } from 'resend';
import { z } from 'zod';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

const requestSchema = z.object({
    fullName: z.string().min(1, "Name is required").max(80),
    year: z.string().min(1, "Year is required"),
    major: z.string().min(1, "Major is required").max(80),
    email: z.string().email("Invalid email").max(254),
    phone: z.string().max(30).optional().or(z.literal('')),
    interestArea: z.string().optional().or(z.literal('')),
    note: z.string().max(600).optional().or(z.literal('')),
    company: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, message: 'Method not allowed' });
    }

    try {
        const body = req.body;

        // Validate
        const result = requestSchema.safeParse(body);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                if (issue.path[0]) {
                    fieldErrors[issue.path[0].toString()] = issue.message;
                }
            });
            return res.status(400).json({ ok: false, fieldErrors });
        }

        const data = result.data;

        // Honeypot check
        if (data.company) {
            // Silently fail for bots
            console.log("Honeypot filled, ignoring.");
            return res.status(200).json({ ok: true });
        }

        // Send email
        const recipients = (process.env.JOIN_REQUEST_RECIPIENTS || '').split(',').map(e => e.trim()).filter(Boolean);

        if (recipients.length === 0) {
            console.warn('No recipients configured');
            // Only return error if we really need to, otherwise functional success for user
            // But maybe we should warn? Let's just return success to not block user flow if config is missing in dev
            if (process.env.NODE_ENV === 'development') {
                console.log("Mock email send (no recipients):", data);
                return res.status(200).json({ ok: true });
            }
        }

        const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

        const { error } = await resend.emails.send({
            from: emailFrom,
            to: recipients,
            subject: 'SAE Aero UW Join Request',
            text: `
New Join Request

Name: ${data.fullName}
Year: ${data.year}
Major: ${data.major}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Interest Area: ${data.interestArea || 'N/A'}
Note:
${data.note || 'N/A'}
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ ok: false, message: 'Failed to send email' });
        }

        return res.status(200).json({ ok: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
}
