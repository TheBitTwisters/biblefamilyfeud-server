import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const items = await req.context.models.ListItem.find();
  return res.json(items);
});

router.post('/', async (req, res) => {
  const list = await req.context.models.List.create({
    question: req.body.question,
    reference: req.body.reference,
  });

  return res.json(list);
});

export default router;
