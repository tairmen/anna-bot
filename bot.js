const TelegramBot = require('node-telegram-bot-api');

// Вставьте сюда ваш токен, полученный от BotFather
const token = '7013284240:AAGcL1BJQEfrOtWrgoU-JAvrm1ednGr3ZLk';

// Создайте экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я ваш бот.');
});

// Обработчик текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Повторяем полученное сообщение
  bot.sendMessage(chatId, `Вы написали: ${msg.text}`);
});

// Дополнительный обработчик команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Помощь: вы можете использовать команды /start и /help.');
});

console.log('Бот запущен!');