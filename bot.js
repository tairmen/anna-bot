const TelegramBot = require('node-telegram-bot-api');

// Вставьте сюда ваш токен, полученный от BotFather
const token = "7013284240:AAGcL1BJQEfrOtWrgoU-JAvrm1ednGr3ZLk";

// Создайте экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Вопросы и прогнозы
const questions = [
  'Какое ваше любимое блюдо?',
  'Какое ваше любимое хобби?',
  'Какую книгу вы читали последней?',
  'Какая ваша любимая музыка?',
  'Какой у вас любимый фильм?',
  'Какое место вы бы хотели посетить?',
  'Какая у вас любимая погода?',
  'Какие у вас домашние животные?',
  'Какой ваш любимый цвет?',
  'Какую кухню мира вы предпочитаете?',
  'Какой у вас любимый вид спорта?',
  'Какой у вас любимый праздник?',
  'Какие у вас планы на выходные?',
  'Какие ваши любимые цветы?',
  'Какая ваша любимая книга?',
  'Какие языки вы знаете?',
  'Какую страну вы хотите посетить?',
  'Какие у вас любимые игры?',
  'Какая ваша любимая цитата?',
  'Какой ваш любимый сезон года?'
];

const forecasts = [
  'Вам предстоит удивительное приключение!',
  'Скоро вы встретите старого друга.',
  'Вас ждет успех в новом проекте.',
  'Ожидайте приятного сюрприза.',
  'Вас ждет финансовый успех.',
  'Вы найдете решение старой проблемы.',
  'Ваша энергия и энтузиазм принесут вам успех.',
  'Вы получите хорошие новости.',
  'Вас ждет неожиданное путешествие.',
  'Вы сделаете важное открытие.',
  'Вас ждут новые знакомства.',
  'Ваши усилия будут вознаграждены.',
  'Вас ждет романтическое приключение.',
  'Ваша мечта скоро сбудется.',
  'Вы достигнете поставленной цели.',
  'Вас ждут положительные изменения.',
  'Ваши идеи будут поддержаны.',
  'Вы обретете внутренний покой.',
  'Вас ждут радостные события.',
  'Вы получите поддержку от друзей.'
];

let userState = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || msg.from.username;
  userState[chatId] = { step: 0, responses: [], userName: userName };
  bot.sendMessage(chatId, `Привет, ${userName}! Ответьте на несколько вопросов.`);
  bot.sendMessage(chatId, questions[Math.floor(Math.random() * questions.length)]);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const user = userState[chatId];
  
    if (!user || msg.text.startsWith('/')) return;
  
    if (user.step === 0) {
      user.responses.push(msg.text);
      user.step++;
      bot.sendMessage(chatId, questions[Math.floor(Math.random() * questions.length)]);
    } else if (user.step === 1) {
      user.responses.push(msg.text);
      const forecast = forecasts[Math.floor(Math.random() * forecasts.length)];
      bot.sendMessage(chatId, `Спасибо, ${user.userName}! Ваш прогноз на жизнь: ${forecast}`);
      delete userState[chatId];  // Сброс состояния пользователя
    }
  });

console.log('Бот запущен!');