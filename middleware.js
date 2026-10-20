// Vercel Routing Middleware (proyecto estático, sin Next.js).
// El hackeo de la web antigua en WordPress generó cientos de URLs spam con ?id=
// (p. ej. /?id=3762086). La web nueva nunca usa el parámetro "id", así que
// cualquier ruta que lo lleve responde 410 Gone + noindex para que Google
// las elimine del índice. El resto de peticiones (utm_, gclid, fbclid...)
// siguen su curso normal: devolver undefined deja pasar la petición.
export default function middleware(request) {
  const url = new URL(request.url);

  if (url.searchParams.has("id")) {
    return new Response("410 Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }
}
