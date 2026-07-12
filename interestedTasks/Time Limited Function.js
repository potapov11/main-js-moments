//  Исходная функция (асинхронная)

// async function fetchData(userId) {
// ... ходит в БД, ждёт ответ
//   return { id: userId, name: "John" };
// }

// Оборачиваем ограничением в 300 мс

// const limitedFetch = timeLimited(fetchData, 300);

// Вызов

// limitedFetch(123)
//   .then(data => console.log("✅", data))
//   .catch(err => console.log("❌", err));