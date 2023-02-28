import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const lists = await req.context.models.List.find();
  return res.json(lists);
});

router.post('/', async (req, res) => {
  const list = await req.context.models.List.create({
    question: req.body.question,
    reference: req.body.reference,
  });

  if (req.body.items) {
    for (let item of req.body.items) {
      await req.context.models.ListItem.create({
        list: list._id,
        title: item.title,
        reference: item.reference,
      });
    }
  }

  return res.json(list);
});

export default router;
