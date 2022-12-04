import prisma from '../../lib/prisma';

// post request to create quotes
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const departDate = new Date(req.body.departDate);
      const returnDate = new Date(req.body.returnDate);

      try {
        const quote = await prisma.quote.create({
          data: { ...req.body, departDate, returnDate },
        });
        res.status(201).json({ quote });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
      }
      break;
    case 'GET':
      const page = parseInt(req.query.page as string) || 1;
      const limit = 10;

      try {
        const quotes = await prisma.quote.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { id: 'desc' },
        });
        res.status(200).json({ quotes, page, limit });
        break;
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
