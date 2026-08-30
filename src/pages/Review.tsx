import { useState } from 'react';
import { Link } from 'react-router';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { sendTelegramMessage, formatFeedbackMessage } from '@/lib/telegram';
import { logReviewToSheet } from '@/lib/sheets';
import { useOrder } from '@/hooks/use-order';

// TODO: replace with your real Google review link.
// Get it from Google Business Profile → "Ask for reviews" → copy the short link.
// It looks like: https://g.page/r/XXXXXXXXXXXX/review
const GOOGLE_REVIEW_LINK = 'https://g.page/r/REPLACE_WITH_YOUR_LINK/review';

type Step = 'rate' | 'private-feedback' | 'private-thanks' | 'public-thanks';

export default function Review() {
  const { lastOrder, customerDetails } = useOrder();
  const [step, setStep] = useState<Step>('rate');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    if (value <= 3) {
      setStep('private-feedback');
    } else {
      logReviewToSheet({ orderId: lastOrder?.order_id || '', rating: value });
      setStep('public-thanks');
    }
  };

  const handleSendFeedback = async () => {
    setIsSubmitting(true);
    await sendTelegramMessage(
      formatFeedbackMessage({
        rating,
        comment,
        orderId: lastOrder?.order_id,
        customerName: customerDetails?.fullName,
        mobileNumber: customerDetails?.mobileNumber
      })
    );
    logReviewToSheet({ orderId: lastOrder?.order_id || '', rating, comment });
    setIsSubmitting(false);
    setStep('private-thanks');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center text-center">
        {step === 'rate' && (
          <>
            <h1 className="text-2xl font-display font-semibold text-charcoal">
              How was your experience?
            </h1>
            <p className="text-muted-foreground mt-2">
              We'd love to hear how your visit went.
            </p>
            <div className="flex gap-2 mt-8">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} star`}
                  onClick={() => handleRate(value)}
                  className="p-2 transition-transform active:scale-90"
                >
                  <Star
                    className={`w-10 h-10 ${
                      value <= rating ? 'fill-gold text-gold' : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'private-feedback' && (
          <>
            <h1 className="text-2xl font-display font-semibold text-charcoal">
              Sorry to hear that
            </h1>
            <p className="text-muted-foreground mt-2">
              What went wrong? Your message goes straight to the hotel manager so we can fix it.
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what happened..."
              rows={5}
              className="w-full mt-6 p-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            />
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-4"
              disabled={!comment.trim() || isSubmitting}
              onClick={handleSendFeedback}
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </Button>
          </>
        )}

        {step === 'private-thanks' && (
          <>
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-display font-semibold text-charcoal">
              Thank you for letting us know
            </h1>
            <p className="text-muted-foreground mt-2">
              Our manager has been notified and will look into this right away.
            </p>
            <Link to="/" className="w-full mt-6">
              <Button variant="outline" size="lg" fullWidth>
                Back to Home
              </Button>
            </Link>
          </>
        )}

        {step === 'public-thanks' && (
          <>
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-4">
              <Star className="w-10 h-10 fill-gold text-gold" />
            </div>
            <h1 className="text-2xl font-display font-semibold text-charcoal">
              We're so glad you enjoyed it!
            </h1>
            <p className="text-muted-foreground mt-2">
              Mind sharing a quick review on Google? It genuinely helps our small team — a line or
              two about your food and service means a lot.
            </p>
            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-6"
            >
              <Button variant="primary" size="lg" fullWidth>
                Write a Google Review
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <Link to="/" className="w-full mt-3">
              <Button variant="ghost" size="lg" fullWidth>
                Maybe Later
              </Button>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
