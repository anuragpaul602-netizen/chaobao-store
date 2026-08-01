import { Resend } from 'resend';

// Initialize client only if key exists
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface SendOrderConfirmationParams {
  to: string;
  orderId: string;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress?: string;
}

/**
 * Sends an order confirmation email to the customer.
 * Fails gracefully without throwing to prevent breaking order creation.
 */
export async function sendOrderConfirmationEmail({
  to,
  orderId,
  totalAmount,
  items,
  shippingAddress,
}: SendOrderConfirmationParams): Promise<void> {
  if (!resend) {
    console.warn('[Email Service] RESEND_API_KEY is not configured. Skipping email.');
    return;
  }

  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  const itemsHtml = items
    .map(
      (item) =>
        `<tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 8px 0;">${item.name} (x${item.quantity})</td>
          <td style="padding: 8px 0; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Order Confirmation</h2>
      <p>Thank you for your purchase! Your order ID is <strong>#${orderId}</strong>.</p>
      
      <h3>Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 2px solid #ccc;">
            <th style="padding: 8px 0;">Item</th>
            <th style="padding: 8px 0; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <p style="font-size: 18px; font-weight: bold; margin-top: 20px; text-align: right;">
        Total: $${totalAmount.toFixed(2)}
      </p>

      ${shippingAddress ? `<p><strong>Shipping to:</strong><br/>${shippingAddress}</p>` : ''}
      
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #777;">Chaobao Store - Thank you for shopping with us!</p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: `Order Confirmation #${orderId}`,
      html: htmlContent,
    });

    if (error) {
      console.error('[Email Service] Error sending email via Resend:', error);
    } else {
      console.log(`[Email Service] Confirmation email sent for order #${orderId}. ID: ${data?.id}`);
    }
  } catch (err) {
    console.error('[Email Service] Unexpected error while sending email:', err);
  }
}