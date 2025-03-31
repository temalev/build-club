<script setup>
const filePath = `/price.pdf`;

// Проверка, существует ли файл (опционально)
fetch(filePath)
  .then((response) => {
    if (response.ok) {
      // Перенаправляем пользователя на файл в той же вкладке
      window.location.href = filePath;
    } else {
      console.error('Файл не найден:', 'price.pdf');
      alert('Файл не найден!');
    }
  })
  .catch((error) => {
    console.error('Ошибка при загрузке файла:', error);
    alert('Произошла ошибка при попытке открыть файл.');
  });
</script>

<style>

</style>