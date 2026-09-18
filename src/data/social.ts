import type { Testimonial, Brand } from '../types'

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'María Fernanda Torres',
    role: 'Novia · Lima',
    eventType: 'Boda',
    date: 'Marzo 2026',
    rating: 5,
    review:
      'La hora loca fue el momento más épico de la boda. La plataforma 360° y los chisperos hicieron que todos nuestros invitados hablaran del evento durante semanas. 100% recomendados.',
  },
  {
    id: 't2',
    name: 'Carlos Mendoza',
    role: 'Papá de la quinceañera',
    eventType: 'XV Años',
    date: 'Junio 2026',
    rating: 5,
    review:
      'Cuidaron cada detalle del vals y la entrada de la corte. La coreografía personalizada emocionó hasta las lágrimas a toda la familia. Un equipo súper profesional.',
  },
  {
    id: 't3',
    name: 'Andrea Salazar',
    role: 'Gerenta de Marketing',
    eventType: 'Corporativo',
    date: 'Abril 2026',
    rating: 5,
    review:
      'Para el aniversario de la empresa, la silent disco y el show de luces fueron un éxito total. La producción fue impecable, puntual y con una energía brutal.',
  },
  {
    id: 't4',
    name: 'Jorge Cabrera',
    role: 'Novio · Arequipa',
    eventType: 'Boda',
    date: 'Febrero 2026',
    rating: 4,
    review:
      'El tótem fotográfico se convirtió en el centro de la pista. Nuestros invitados siguen compartiendo los videos. Solo mejorarían la gestión del último cambio de fecha.',
  },
  {
    id: 't5',
    name: 'Lucía Paredes',
    role: 'Mamá de la promoción',
    eventType: 'Promoción / Grado',
    date: 'Diciembre 2025',
    rating: 5,
    review:
      'Hicieron nuestra noche de promoción inolvidable. Personajes sorpresa, pistola CO₂ y un aftermovie que nos hizo llorar. Nadie quiso que terminara.',
  },
  {
    id: 't6',
    name: 'Renato Quispe',
    role: 'Organizador de eventos',
    eventType: 'Concierto / Festival',
    date: 'Julio 2026',
    rating: 5,
    review:
      'Trabajamos con ellos en un festival para 800 personas. La logística, el sonido y los efectos estuvieron a nivel de grandes producciones. Ya son aliados fijos.',
  },
]

export const brands: Brand[] = [
  { id: 'b1', name: 'Grupo Andino' },
  { id: 'b2', name: 'Hoteles Miramar' },
  { id: 'b3', name: 'Casa Real Eventos' },
  { id: 'b4', name: 'Corporación Norte' },
  { id: 'b5', name: 'Studio 360' },
  { id: 'b6', name: 'Banquetería del Sur' },
  { id: 'b7', name: 'Clubes Lima' },
  { id: 'b8', name: 'Aviación Events' },
]