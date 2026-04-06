export const CONTACT_INFO = {
  office: "045395149",
  tj: "0870381036",
  tim: "0879134059",
  whatsapp: "+353876301856",
  whatsappLink: "https://api.whatsapp.com/send?phone=+353876301856"
};

export const CATCHMENT_AREAS = "South Dublin, North Dublin, City Centre, and surrounding counties of Meath, Kildare, Kilkenny + Waterford.";

export const TESTIMONIALS = [
  {
    text: "Many thanks to TJ Murphy and his team. A pleasure to have them to do my new drive in and my back garden. They where so tidy and neat would highly recommend TJ and his team.",
    author: "Brian O Driscoll",
    service: "Driveway Installation"
  },
  {
    text: "Thomas and his boys were so professional and obliging to deal with, they did a super job with my artificial grass, were incredibly tidy and I wouldn't hesitate using their services again or indeed recommending them to anyone. Thanks Thomas and lads.",
    author: "Lavina",
    service: "Artificial Grass Installation"
  },
  {
    text: "I can thoroughly recommend TJ and his team. They did an outstanding job on our back garden. They arrived exactly when they said they would, making sure every detail of the job was finished promptly and properly. We'll be using them again in the future!",
    author: "Marta & Paul Moran",
    service: "Garden Renovation"
  },
  {
    text: "Hired Thomas and his team from the bark website. Excellent communication from getting quote to getting job finished. Thomas and his team laid artificial grass and was very efficient. The job standard was very good. Cheers lads. Would recommend",
    author: "Anonymous",
    service: "Artificial Grass Installation"
  },
  {
    text: "Had the pleasure of having TJ do my front and back garden. TJ and the lads were amazing. Punctual, polite and professional. We couldn't be happier with the work they did for us.",
    author: "Manda",
    service: "Artificial Grass Installation"
  },
  {
    text: "I wanted to upgrade the outside of my property with neat driveways and a neighbor said give TJ Paving a buzz! Which I did. End result is lovely, the driveway in concrete and the back of the house/patio in sandstone. Gr8 work chaps BTW and thanks.",
    author: "Michael Harrow",
    service: "Driveway & Patio"
  }
];

// Re-export images we just generated (some might be missing if generate_image failed, but we assume success)
export const IMAGES = {
  hero: {
    home: new URL('@assets/hero-home.png', import.meta.url).href,
    paving: new URL('@assets/hero-paving.png', import.meta.url).href,
    patios: new URL('@assets/hero-patios.png', import.meta.url).href,
    walls: new URL('@assets/hero-walls.png', import.meta.url).href,
    grass: new URL('@assets/hero-grass.png', import.meta.url).href,
  },
  services: {
    paving: new URL('@assets/service-paving.png', import.meta.url).href,
    patios: new URL('@assets/service-patios.png', import.meta.url).href,
    walls: new URL('@assets/service-walls.png', import.meta.url).href,
    grass: new URL('@assets/service-grass.png', import.meta.url).href,
  },
  gallery: [
    new URL('@assets/gallery-1.png', import.meta.url).href,
    new URL('@assets/gallery-paving-2.png', import.meta.url).href,
    new URL('@assets/gallery-paving-3.png', import.meta.url).href,
    new URL('@assets/gallery-patios-1.png', import.meta.url).href,
    new URL('@assets/gallery-patios-2.png', import.meta.url).href,
    new URL('@assets/gallery-walls-1.png', import.meta.url).href,
    new URL('@assets/gallery-walls-2.png', import.meta.url).href,
    new URL('@assets/gallery-grass-1.png', import.meta.url).href,
    new URL('@assets/gallery-grass-2.png', import.meta.url).href,
  ]
};
