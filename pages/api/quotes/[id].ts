import prisma from '../../../lib/prisma';

// post request to create quotes
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // update quote
      const departDate = new Date(req.body.departDate);
      const returnDate = new Date(req.body.returnDate);

      try {
        const quote = await prisma.quote.update({
          where: { id: req.query.id as string },
          data: { ...req.body, departDate, returnDate },
        });
        res.status(201).json({ quote });
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
      }
      break;
    case 'GET':
      const quote = await prisma.quote.findUnique({
        where: { id: req.query.id as string },
      });
      res.status(200).json({ quote });
      break;
    case 'DELETE':
      const deletedQuote = await prisma.quote.delete({
        where: { id: req.query.id as string },
      });
      res.status(200).json({ deletedQuote });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
