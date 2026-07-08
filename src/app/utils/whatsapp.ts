import { Herb } from '../data/herbs';

const WHATSAPP_NUMBER = '918959543042'; // WhatsApp number without + and spaces

export function orderOnWhatsApp(herb: Herb) {
  const message = `Hello! I would like to order:\n\n*${herb.name}* (${herb.scientificName})\nPrice: ₹${herb.price}/${herb.unit}\n\nPlease confirm availability and delivery details.`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}
