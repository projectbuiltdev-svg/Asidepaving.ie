export interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael O'Brien",
    location: "Swords, Dublin",
    service: "Driveway",
    rating: 5,
    date: "2024-11-15",
    text: "Aside Paving did a fantastic job on our cobblelock driveway. The team were professional, clean and finished exactly on time. Really happy with the result — our neighbours have already been asking for their number.",
  },
  {
    id: 2,
    name: "Sarah Connolly",
    location: "Naas, Kildare",
    service: "Patio",
    rating: 5,
    date: "2024-10-20",
    text: "We had a natural sandstone patio installed and it's transformed our garden. From the initial quote to the finished job, the whole experience was excellent. Would highly recommend.",
  },
  {
    id: 3,
    name: "James Murphy",
    location: "Navan, Meath",
    service: "Artificial Grass",
    rating: 5,
    date: "2024-09-10",
    text: "Best decision we made for our garden. The artificial grass looks incredible and the kids love it. No more muddy footprints in the house after rain. The team were great throughout.",
  },
  {
    id: 4,
    name: "Patricia Walsh",
    location: "Dundrum, Dublin",
    service: "Garden Walls",
    rating: 5,
    date: "2024-08-05",
    text: "Had a new boundary wall and piers built. The quality of the brickwork is outstanding. Aside Paving were on time, on budget and left the site spotless. Couldn't be happier.",
  },
  {
    id: 5,
    name: "David Kelly",
    location: "Lucan, Dublin",
    service: "Driveway",
    rating: 5,
    date: "2024-07-22",
    text: "Third time using Aside Paving — first for my parents, then my own house, now my brother. Says it all really. Always a brilliant job at a fair price.",
  },
  {
    id: 6,
    name: "Anne Fitzpatrick",
    location: "Maynooth, Kildare",
    service: "Block Paving",
    rating: 5,
    date: "2024-06-18",
    text: "The block paving on our driveway and front path is beautiful. The team were so professional and tidy. They went above and beyond to make sure every detail was right.",
  },
];
