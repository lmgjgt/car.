import express from 'express';
const router = express.Router();

const services = [
  'نفاد الوقود',
  'تعطُّل الإطارات',
  'خلل في المحرك',
  'شحن البطارية',
  'قطر المركبة'
];

router.get('/', (req, res) => {
  res.json(services);
});

export default router;
