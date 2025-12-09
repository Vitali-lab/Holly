import { getCurrentYear } from '../utils/getCurrentYear';

export const PHONE_NUMBER = '+375 (29) 223-45-67';
export const EMAIL = 'info@holly.by';
export const ADRESS = 'Минск, ул. Ленина, 10';

export const FOOTER_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about-us', label: 'О нас' },
  { href: '/delivery', label: 'Доставка' },
];

export const FOOTER_CONTACTS = [`Телефон: ${PHONE_NUMBER}`, `Email: ${EMAIL}`, `Адрес: ${ADRESS}`];
export const COPYRIGHT = `© 2022 - ${getCurrentYear()} Holly-Minsk. Все права защищены.`;

export const ORDER_STATUS = {
  created: 'Создан',
  confirmed: 'Подтвержден',
  delivery: 'Доставка',
  completed: 'Выполнен',
};

export const ABOUT_US_MAIN_TEXT = `Добро пожаловать в Holly — онлайн-пространство, где женская мода встречается с
комфортом, вниманием к деталям и любовью к стилю. Мы создаём одежду, которая
подчёркивает индивидуальность, вдохновляет на перемены и помогает чувствовать себя
уверенно каждый день. В Holly вы найдёте тщательно подобранные коллекции — от базовых
вещей до акцентных образов, от уютных тканей до элегантных силуэтов. Наша философия
проста: мода должна быть доступной, вдохновляющей и настоящей. Мы работаем напрямую с
производителями, чтобы предлагать вам качественные вещи по честной цене. Каждая модель
проходит ручной отбор, чтобы соответствовать нашему главному критерию — она должна
приносить радость. Мы ценим ваше время, вкус и доверие. Поэтому в Holly — быстрая
доставка, честная обратная связь и забота на каждом этапе: от выбора до получения
заказа.`;

export const ABOUT_US_VALUES = [
  {
    icon: 'heart',
    title: 'Качество',
    description:
      'Тщательный отбор каждой модели. Мы работаем только с проверенными производителями и материалами премиум-класса.',
  },
  {
    icon: 'star',
    title: 'Стиль',
    description:
      'Актуальные тренды и вневременная классика. Коллекции, которые подчеркивают вашу индивидуальность.',
  },
  {
    icon: 'users',
    title: 'Забота',
    description:
      'Мы ценим каждого клиента. Персональный подход, быстрая доставка и внимательная служба поддержки.',
  },
  {
    icon: 'diamond',
    title: 'Доступность',
    description:
      'Качественная мода по честным ценам. Прямые поставки от производителей без наценок посредников.',
  },
];

export const ABOUT_US_MISSION = {
  title: 'Holly — это не просто одежда. Это настроение. Это ты.',
  text: `Мы верим, что каждая женщина заслуживает чувствовать себя красивой, уверенной и
  стильной. Наша цель — сделать качественную моду доступной для всех, сохраняя при этом
  высокие стандарты качества и внимания к деталям.`,
};

export const ABOUT_US_STATS = [
  { number: '1K+', label: 'Довольных клиентов' },
  { number: '500+', label: 'Моделей одежды' },
  { number: '50+', label: 'Городов доставки' },
  { number: '24/7', label: 'Поддержка клиентов' },
];

export const DELIVERY_METHODS = [
  {
    title: 'Курьерская доставка',
    description: 'Доставка курьером по Минску в течение 1-2 рабочих дней',
    price: 'Бесплатно при заказе от 200 руб.',
    icon: 'truck',
  },
  {
    title: 'Европочта',
    description: 'Доставка через Европочту в любой регион страны',
    price: 'Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)',
    icon: 'envelope',
  },
  {
    title: 'Белпочта',
    description: 'Доставка через Белпочту по всей Беларуси',
    price: 'Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)',
    icon: 'truck',
  },
  {
    title: 'Самовывоз',
    description: 'Заберите заказ самостоятельно из нашего пункта выдачи',
    price: 'Бесплатно',
    icon: 'home',
  },
];

export const PAYMENTS_METHODS = [
  {
    title: 'Онлайн оплата',
    description: 'Банковской картой Visa, MasterCard, МИР через защищенный платежный шлюз',
    icon: 'credit-card',
  },
  {
    title: 'Наличными курьеру',
    description: 'Оплата наличными при получении заказа (только для курьерской доставки)',
    icon: 'money',
  },
  {
    title: 'При получении',
    description: 'Оплата наложенным платежом при получении в отделении почты ',
    icon: 'shopping-bag',
  },
];

export const FAQ = [
  {
    question: 'Как отследить заказ?',
    answer:
      'После оформления заказа вы получите номер отслеживания на email. Также вы можете отследить статус заказа в личном кабинете.',
  },
  {
    question: 'Можно ли изменить адрес доставки?',
    answer:
      'Да, вы можете изменить адрес доставки до момента отправки заказа. Свяжитесь с нами по телефону или email.',
  },
  {
    question: 'Что делать, если товар не подошел?',
    answer:
      'Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и с бирками.',
  },
  {
    question: 'Есть ли доставка в другие страны?',
    answer:
      'В настоящее время мы доставляем только по территории Беларуси. О доставке в другие страны уточняйте у наших менеджеров.',
  },
];

export const COLLECTION = (
  allProducts,
  winterSeason,
  summerSeason,
  autumnSeason,
  springSeason
) => ({
  winter: {
    name: 'Зима',
    products: winterSeason ? allProducts.filter((item) => item.seasonId === winterSeason.id) : [],
  },
  summer: {
    name: 'Лето',
    products: summerSeason ? allProducts.filter((item) => item.seasonId === summerSeason.id) : [],
  },
  autumn: {
    name: 'Осень',
    products: autumnSeason ? allProducts.filter((item) => item.seasonId === autumnSeason.id) : [],
  },
  spring: {
    name: 'Весна',
    products: springSeason ? allProducts.filter((item) => item.seasonId === springSeason.id) : [],
  },
});
