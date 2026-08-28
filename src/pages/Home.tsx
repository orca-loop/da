import { useState } from 'react';
import { Link } from 'react-router';
import { Bed, UtensilsCrossed, Phone, MapPin, Star, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import heroImage from '@/assets/generated/hero-reception.webp';
import restaurantImage from '@/assets/generated/restaurant.png';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'stay' | 'dine'>('stay');

  const handleCall = () => {
    window.location.href = 'tel:+919111799982';
  };

  const handleDirections = () => {
    window.open('https://maps.app.goo.gl/R2Znmvq9gSzokgxU8', '_blank');
  };

  return (
    <div data-ev-id="ev_05f406db88" className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section data-ev-id="ev_faa8b39c72" className="relative h-[70vh] min-h-[500px]">
        {/* Background Image */}
        <div data-ev-id="ev_cd396b9109" className="absolute inset-0">
          <img data-ev-id="ev_038ef87c4f"
          src={heroImage}
          alt="Hotel Amrit Reception"
          className="w-full h-full object-cover" />

          <div data-ev-id="ev_08889f864d" className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/80" />
        </div>

        {/* Header */}
        <header data-ev-id="ev_c8f0eee280" className="relative z-10 flex items-center justify-between px-4 py-4">
          <div data-ev-id="ev_507fc0ee09" className="flex items-center gap-2">
            <div data-ev-id="ev_c8b00db616" className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
              <span data-ev-id="ev_3bbfd31d37" className="text-sm font-display font-bold text-charcoal">A</span>
            </div>
            <span data-ev-id="ev_eb35a5ec95" className="font-display font-semibold text-white text-lg">Hotel Amrit</span>
          </div>
          <button data-ev-id="ev_535ce84a66"
          onClick={handleCall}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Call Hotel">

            <Phone className="w-5 h-5" />
          </button>
        </header>

        {/* Hero Content */}
        <div data-ev-id="ev_20991b0f8e" className="relative z-10 flex flex-col items-center justify-center h-full px-6 -mt-16">
          <Logo size="large" />
          <h1 data-ev-id="ev_aadd76f66b" className="mt-4 text-3xl md:text-4xl font-display font-bold text-white text-center">
            Hotel Amrit
          </h1>
          <p data-ev-id="ev_87e1ac1ff9" className="mt-2 text-white/80 text-center max-w-sm">
            Experience luxury hospitality in the heart of Indore
          </p>
          
          {/* Rating */}
          <div data-ev-id="ev_6bb658bfaa" className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) =>
            <Star key={star} className="w-4 h-4 fill-gold text-gold" />
            )}
            <span data-ev-id="ev_96e7440e01" className="ml-2 text-white/80 text-sm">Premium Stay</span>
          </div>

          {/* Scroll Indicator */}
          <div data-ev-id="ev_9bfab3a562" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav data-ev-id="ev_cc54bf04ae" className="sticky top-0 z-50 bg-white shadow-sm">
        <div data-ev-id="ev_f58cbc1652" className="max-w-lg mx-auto flex">
          <button data-ev-id="ev_b08aebd005"
          onClick={() => setActiveTab('stay')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors border-b-2 ${
          activeTab === 'stay' ?
          'text-gold border-gold' :
          'text-charcoal-light border-transparent hover:text-charcoal'}`
          }>

            <Bed className="w-5 h-5" />
            STAY
          </button>
          <button data-ev-id="ev_21e614d74e"
          onClick={() => setActiveTab('dine')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors border-b-2 ${
          activeTab === 'dine' ?
          'text-gold border-gold' :
          'text-charcoal-light border-transparent hover:text-charcoal'}`
          }>

            <UtensilsCrossed className="w-5 h-5" />
            DINE
          </button>
        </div>
      </nav>

      {/* Content Sections */}
      <main data-ev-id="ev_1656ce5bce" className="max-w-lg mx-auto px-4 py-8">
        {activeTab === 'stay' ?
        <StaySection /> :

        <DineSection onDirections={handleDirections} />
        }
      </main>

      {/* Footer */}
      <footer data-ev-id="ev_6742b0a598" className="bg-charcoal text-white py-8 px-4">
        <div data-ev-id="ev_da0d01a61f" className="max-w-lg mx-auto text-center">
          <Logo size="small" />
          <address data-ev-id="ev_5069bbd3da" className="mt-4 text-sm text-white/70 not-italic leading-relaxed">
            138 Hare Krishna Vihar, Nipania<br data-ev-id="ev_3fdc6c8015" />
            Indore, Madhya Pradesh - 452010<br data-ev-id="ev_bb32f2149b" />
            India
          </address>
          <p data-ev-id="ev_bcc09e08ac" className="mt-4 text-xs text-white/50">
            © {new Date().getFullYear()} Hotel Amrit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>);

}

function StaySection() {
  return (
    <div data-ev-id="ev_e71ece2439" className="flex flex-col gap-6">
      <div data-ev-id="ev_d7b8dd5f66" className="text-center">
        <h2 data-ev-id="ev_b2303bb2bf" className="text-2xl font-display font-semibold text-charcoal">
          Comfortable Rooms
        </h2>
        <p data-ev-id="ev_fa3c648221" className="mt-2 text-muted-foreground">
          Rest in luxury with modern amenities and warm hospitality
        </p>
      </div>

      {/* Room Preview Cards */}
      <div data-ev-id="ev_119570254d" className="flex flex-col gap-4">
        <RoomCard
          title="Deluxe Room"
          description="Spacious room with king bed, AC, TV, and premium amenities"
          price="₹2,499"
          originalPrice={undefined}
          imageType="deluxe" />

        <RoomCard
          title="Premium Suite"
          description="Luxury suite with separate living area and panoramic views"
          price="₹4,999"
          originalPrice={undefined}
          imageType="suite" />

      </div>

      {/* CTA to Gallery & Enquiry */}
      <Link data-ev-id="ev_fee99decdd" to="/stay" className="w-full">
        <Button variant="primary" size="lg" fullWidth>
          <Bed className="w-5 h-5" />
          VIEW ROOMS & ENQUIRE
        </Button>
      </Link>
    </div>);

}

import roomDeluxeImage from '@/assets/generated/room-deluxe.webp';
import roomSuiteImage from '@/assets/generated/room-suite.jpeg';

function RoomCard({ title, description, price, originalPrice, imageType




}: {title: string;description: string;price: string;originalPrice?: string;imageType: 'deluxe' | 'suite';}) {
  const image = imageType === 'deluxe' ? roomDeluxeImage : roomSuiteImage;

  return (
    <div data-ev-id="ev_cfa9fb14c9" className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
      <img data-ev-id="ev_581911da25"
      src={image}
      alt={title}
      className="w-full h-40 object-cover" />

      <div data-ev-id="ev_98ecd2505d" className="p-4">
        <div data-ev-id="ev_0cc115417a" className="flex items-start justify-between">
          <div data-ev-id="ev_e0e0d50cee">
            <h3 data-ev-id="ev_538c3e5bc9" className="font-semibold text-charcoal">{title}</h3>
            <p data-ev-id="ev_1054b91fac" className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <span data-ev-id="ev_5c6fb361ad" className="text-right whitespace-nowrap ml-2">
            {originalPrice &&
            <span className="block text-xs text-muted-foreground line-through">{originalPrice}</span>
            }
            <span className="text-gold font-semibold text-sm">{price}/night</span>
          </span>
        </div>
      </div>
    </div>);

}

function DineSection({ onDirections }: {onDirections: () => void;}) {
  return (
    <div data-ev-id="ev_43430c1b01" className="flex flex-col gap-6">
      <div data-ev-id="ev_7d5900c860" className="text-center">
        <h2 data-ev-id="ev_b311c37aa6" className="text-2xl font-display font-semibold text-charcoal">
          Authentic Indian Cuisine
        </h2>
        <p data-ev-id="ev_60b752ab82" className="mt-2 text-muted-foreground">
          Order delicious food directly to your table
        </p>
      </div>

      {/* Restaurant Preview */}
      <div data-ev-id="ev_c6bf4055fd" className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
        <img data-ev-id="ev_9b420732c2"
        src={restaurantImage}
        alt="Hotel Amrit Restaurant"
        className="w-full h-48 object-cover" />

        <div data-ev-id="ev_b46af221bf" className="p-4">
          <h3 data-ev-id="ev_296c44fb99" className="font-semibold text-charcoal">Multi-Cuisine Restaurant</h3>
          <p data-ev-id="ev_23c110c163" className="text-sm text-muted-foreground mt-1">
            From traditional thalis to continental favorites, enjoy fresh meals prepared by our expert chefs
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div data-ev-id="ev_d568127063" className="flex flex-col gap-3">
        <Link data-ev-id="ev_34aa76f90d" to="/menu" className="w-full">
          <Button variant="primary" size="lg" fullWidth>
            <UtensilsCrossed className="w-5 h-5" />
            ORDER FOOD
          </Button>
        </Link>

        <Button variant="outline" size="lg" fullWidth onClick={onDirections}>
          <MapPin className="w-5 h-5" />
          GET DIRECTIONS
        </Button>
      </div>

      {/* QR Info */}
      <div data-ev-id="ev_fdae45c44a" className="bg-gold-light/50 rounded-xl p-4 text-center">
        <p data-ev-id="ev_d8a08e9747" className="text-sm text-charcoal">
          📱 Scan the QR code on your table for quick ordering
        </p>
      </div>
    </div>);

}