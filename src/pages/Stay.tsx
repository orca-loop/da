import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Phone, Wifi, Wind, Tv, Coffee, X, ChevronLeft, ChevronRight, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { sendTelegramMessage, formatRoomEnquiryMessage } from '@/lib/telegram';
import roomDeluxeImage from '@/assets/generated/room-deluxe.webp';
import roomSuiteImage from '@/assets/generated/room-suite.jpeg';
import heroImage from '@/assets/generated/hero-reception.webp';
import lobbyImage from '@/assets/generated/lobby-collage.webp';

const galleryImages = [
{ src: heroImage, title: 'Hotel Amrit', description: 'Our building, right in the heart of Indore' },
{ src: lobbyImage, title: 'Reception & Lobby', description: 'Grand entrance with warm hospitality' },
{ src: roomDeluxeImage, title: 'Deluxe Room', description: 'Comfortable king bed with modern amenities' },
{ src: roomSuiteImage, title: 'Premium Suite', description: 'Spacious suite with living area' }];


const roomTypes = [
{
  id: 'deluxe',
  name: 'Deluxe Room',
  price: '₹2,499',
  // To run a discount, uncomment the line below and set the pre-discount price.
  // originalPrice: '₹2,999',
  originalPrice: undefined as string | undefined,
  image: roomDeluxeImage,
  amenities: ['King Bed', 'Air Conditioning', 'Smart TV', 'Free WiFi', 'Room Service'],
  description: 'Spacious and comfortable room perfect for business travelers and couples.'
},
{
  id: 'suite',
  name: 'Premium Suite',
  price: '₹4,999',
  // To run a discount, uncomment the line below and set the pre-discount price.
  // originalPrice: '₹5,999',
  originalPrice: undefined as string | undefined,
  image: roomSuiteImage,
  amenities: ['King Bed', 'Living Area', 'Air Conditioning', 'Smart TV', 'Free WiFi', 'Mini Bar', 'Room Service'],
  description: 'Luxurious suite with separate living area for the ultimate comfort experience.'
}];


export default function Stay() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleCall = () => {
    window.location.href = 'tel:+919111799982';
  };

  return (
    <div data-ev-id="ev_9bc3664180" className="min-h-screen bg-surface">
      {/* Header */}
      <header data-ev-id="ev_a5c7ecf9b0" className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_7d9878ed2c" className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div data-ev-id="ev_fd8ec218ee" className="flex items-center gap-3">
            <Link data-ev-id="ev_2171b4dd5d"
            to="/"
            className="p-2 -ml-2 text-charcoal hover:text-gold transition-colors"
            aria-label="Go back">

              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 data-ev-id="ev_83c7e72ff6" className="font-display font-semibold text-charcoal">Rooms & Stay</h1>
          </div>
          <button data-ev-id="ev_1064fe6841"
          onClick={handleCall}
          className="p-2 text-charcoal hover:text-gold transition-colors"
          aria-label="Call Hotel">

            <Phone className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main data-ev-id="ev_174a1dd9c1" className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-8">
        {/* Gallery Section */}
        <section data-ev-id="ev_a6662fff49">
          <h2 data-ev-id="ev_d189f17829" className="text-xl font-display font-semibold text-charcoal mb-4">Gallery</h2>
          <div data-ev-id="ev_3a124cd908" className="grid grid-cols-2 gap-2">
            {galleryImages.map((img, index) =>
            <button data-ev-id="ev_4b4364eb96"
            key={index}
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden rounded-lg ${index === 0 ? 'col-span-2 h-48' : 'h-32'}`}>

                <img data-ev-id="ev_f2833f1fb3"
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />

                <div data-ev-id="ev_d0da600627" className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <span data-ev-id="ev_8593fe3a8f" className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  {img.title}
                </span>
              </button>
            )}
          </div>
        </section>

        {/* Room Types */}
        <section data-ev-id="ev_ddf6ea97a8">
          <h2 data-ev-id="ev_fcb74cac0f" className="text-xl font-display font-semibold text-charcoal mb-4">Our Rooms</h2>
          <div data-ev-id="ev_05711265ed" className="flex flex-col gap-4">
            {roomTypes.map((room) =>
            <div data-ev-id="ev_38eb3d14aa" key={room.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
                <img data-ev-id="ev_833b978099"
              src={room.image}
              alt={room.name}
              className="w-full h-44 object-cover" />

                <div data-ev-id="ev_c9435d3066" className="p-4">
                  <div data-ev-id="ev_df4e9df5b0" className="flex items-start justify-between">
                    <h3 data-ev-id="ev_23e3145f52" className="font-semibold text-charcoal text-lg">{room.name}</h3>
                    <span data-ev-id="ev_56dd7168ac" className="text-right">
                      {room.originalPrice &&
                    <span className="block text-xs text-muted-foreground line-through">{room.originalPrice}</span>
                    }
                      <span className="text-gold font-bold">{room.price}<span data-ev-id="ev_cb75dd8a26" className="text-xs text-muted-foreground font-normal">/night</span></span>
                    </span>
                  </div>
                  <p data-ev-id="ev_ea3a3c245a" className="text-sm text-muted-foreground mt-2">{room.description}</p>
                  
                  {/* Amenities */}
                  <div data-ev-id="ev_e941196980" className="mt-3 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((amenity) =>
                  <span data-ev-id="ev_33b9051164" key={amenity} className="text-xs bg-cream text-charcoal px-2 py-1 rounded-full flex items-center gap-1">
                        {amenity === 'Free WiFi' && <Wifi className="w-3 h-3" />}
                        {amenity === 'Air Conditioning' && <Wind className="w-3 h-3" />}
                        {amenity === 'Smart TV' && <Tv className="w-3 h-3" />}
                        {amenity === 'Room Service' && <Coffee className="w-3 h-3" />}
                        {amenity}
                      </span>
                  )}
                    {room.amenities.length > 4 &&
                  <span data-ev-id="ev_25f93db6b9" className="text-xs text-gold">+{room.amenities.length - 4} more</span>
                  }
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Enquiry CTA */}
        <section data-ev-id="ev_03906bf6b0" className="bg-gradient-to-br from-gold/10 to-gold-light/30 rounded-xl p-6 text-center">
          <h3 data-ev-id="ev_f212bcc7ac" className="font-display font-semibold text-charcoal text-lg">Interested in Booking?</h3>
          <p data-ev-id="ev_10d12810be" className="text-sm text-muted-foreground mt-2">
            Fill out the enquiry form and our team will get back to you shortly
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-4"
            onClick={() => setShowEnquiryForm(true)}>

            ENQUIRE NOW
          </Button>
          <button data-ev-id="ev_7f2f13dfbb"
          onClick={handleCall}
          className="mt-3 text-sm text-gold hover:underline flex items-center justify-center gap-1 w-full">

            <Phone className="w-4 h-4" />
            Or call us directly
          </button>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen &&
      <div data-ev-id="ev_c81073d08e" className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center">
          <button data-ev-id="ev_932f2ddb29"
        onClick={closeLightbox}
        className="absolute top-4 right-4 p-2 text-white hover:text-gold transition-colors"
        aria-label="Close gallery">

            <X className="w-6 h-6" />
          </button>
          
          <button data-ev-id="ev_ca80fdebec"
        onClick={prevImage}
        className="absolute left-4 p-2 text-white hover:text-gold transition-colors"
        aria-label="Previous image">

            <ChevronLeft className="w-8 h-8" />
          </button>

          <div data-ev-id="ev_2f71e7fab7" className="max-w-2xl max-h-[80vh] px-4">
            <img data-ev-id="ev_0b76da4781"
          src={galleryImages[currentImageIndex].src}
          alt={galleryImages[currentImageIndex].title}
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg" />

            <div data-ev-id="ev_8c059eb012" className="text-center mt-4">
              <h3 data-ev-id="ev_93ebd7ed5e" className="text-white font-semibold">{galleryImages[currentImageIndex].title}</h3>
              <p data-ev-id="ev_67a0620b10" className="text-white/70 text-sm">{galleryImages[currentImageIndex].description}</p>
              <p data-ev-id="ev_bcde9cad77" className="text-white/50 text-xs mt-2">
                {currentImageIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>

          <button data-ev-id="ev_a0320ccff4"
        onClick={nextImage}
        className="absolute right-4 p-2 text-white hover:text-gold transition-colors"
        aria-label="Next image">

            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      }

      {/* Enquiry Form Modal */}
      {showEnquiryForm &&
      <EnquiryModal
        onClose={() => {
          setShowEnquiryForm(false);
          setEnquirySuccess(false);
        }}
        onSuccess={() => setEnquirySuccess(true)}
        success={enquirySuccess} />

      }
    </div>);

}

function EnquiryModal({ onClose, onSuccess, success



}: {onClose: () => void;onSuccess: () => void;success: boolean;}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: 'deluxe',
    guests: '2',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSendError('');

    const sent = await sendTelegramMessage(
      formatRoomEnquiryMessage({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        roomType: form.roomType,
        guests: form.guests,
        message: form.message || undefined
      })
    );

    setIsSubmitting(false);

    if (!sent) {
      setSendError('Could not send enquiry. Please call us directly instead.');
      return;
    }

    onSuccess();
  };

  if (success) {
    return (
      <div data-ev-id="ev_c90f7b1d77" className="fixed inset-0 z-50 bg-charcoal/80 flex items-end sm:items-center justify-center p-4">
        <div data-ev-id="ev_bba9ab57aa" className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 text-center">
          <div data-ev-id="ev_127f328f6a" className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h3 data-ev-id="ev_fa20fc5654" className="mt-4 text-xl font-display font-semibold text-charcoal">
            Enquiry Sent!
          </h3>
          <p data-ev-id="ev_73fc69eeea" className="mt-2 text-muted-foreground">
            Thank you for your interest. Our team will contact you shortly.
          </p>
          <Button variant="primary" fullWidth className="mt-6" onClick={onClose}>
            DONE
          </Button>
        </div>
      </div>);

  }

  return (
    <div data-ev-id="ev_22b0388bac" className="fixed inset-0 z-50 bg-charcoal/80 flex items-end sm:items-center justify-center">
      <div data-ev-id="ev_45dd7f9fca" className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div data-ev-id="ev_8969e9bc80" className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <h3 data-ev-id="ev_634bef6258" className="font-display font-semibold text-charcoal">Room Enquiry</h3>
          <button data-ev-id="ev_019c4b6c2a"
          onClick={onClose}
          className="p-2 -mr-2 text-charcoal hover:text-gold transition-colors"
          aria-label="Close">

            <X className="w-5 h-5" />
          </button>
        </div>

        <form data-ev-id="ev_d66836fc4f" onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required />


          <Input
            label="Phone Number"
            type="tel"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            maxLength={10}
            inputMode="numeric" />


          <Input
            label="Email (Optional)"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />


          <div data-ev-id="ev_a24fe75dde" className="grid grid-cols-2 gap-3">
            <Input
              label="Check-in Date"
              type="date"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              required
              min={new Date().toISOString().split('T')[0]} />

            <Input
              label="Check-out Date"
              type="date"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              required
              min={form.checkIn || new Date().toISOString().split('T')[0]} />

          </div>

          <div data-ev-id="ev_da5ac61dc9" className="grid grid-cols-2 gap-3">
            <div data-ev-id="ev_4434e96b01">
              <label data-ev-id="ev_b4c4c27f8d" className="block text-sm font-medium text-charcoal mb-1.5">Room Type</label>
              <select data-ev-id="ev_bdd1169080"
              value={form.roomType}
              onChange={(e) => setForm({ ...form, roomType: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold">

                <option data-ev-id="ev_118ea394c2" value="deluxe">Deluxe Room</option>
                <option data-ev-id="ev_50c7a6de47" value="suite">Premium Suite</option>
              </select>
            </div>
            <div data-ev-id="ev_516e832564">
              <label data-ev-id="ev_faa4d9c1a2" className="block text-sm font-medium text-charcoal mb-1.5">Guests</label>
              <select data-ev-id="ev_5b4fc25ba7"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold">

                <option data-ev-id="ev_5bde511135" value="1">1 Guest</option>
                <option data-ev-id="ev_88fd72e41f" value="2">2 Guests</option>
                <option data-ev-id="ev_82bbdc9dda" value="3">3 Guests</option>
                <option data-ev-id="ev_3b70f5c0c1" value="4">4+ Guests</option>
              </select>
            </div>
          </div>

          <div data-ev-id="ev_f08f1e09d1">
            <label data-ev-id="ev_20e5300cf8" className="block text-sm font-medium text-charcoal mb-1.5">Special Requests (Optional)</label>
            <textarea data-ev-id="ev_de5a510217"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Any special requirements or questions?"
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-charcoal text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold" />

          </div>

          {sendError &&
          <div data-ev-id="ev_sende77001" className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {sendError}
            </div>
          }

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
            <Send className="w-4 h-4" />
            {isSubmitting ? 'SENDING...' : 'SEND ENQUIRY'}
          </Button>

          <p data-ev-id="ev_83b6da12a9" className="text-xs text-center text-muted-foreground">
            We typically respond within 2 hours during business hours
          </p>
        </form>
      </div>
    </div>);

}
