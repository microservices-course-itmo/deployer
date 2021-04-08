import React from 'react'
import ReactMarkdown from 'react-markdown'
import { render } from 'react-dom'
import gfm from 'remark-gfm'

/* const useStyles = makeStyles(() =>
  createStyles({
    main: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#FAFAFA',
      textAlign: 'center',
    },
    notMain: {
      box: 'border-box',
      margin: 0,
      padding: '0 32px',
      minWidth: '1024 px',
      maxWidth: '1164 px',
    },
  })
)
*/
export const HelpPage = () => {
  const markdown = `
  # Пользовательская инструкция web-приложения Deployer.

  ### *Deployer – сервис, предоставляющий интерфейс по развёртыванию контейнерного программного обеспечения в вашем кластере и и управления ресурсами кластера.*
  
  ### Вы можете использовать Deployer, чтобы получить обзор приложений, работающих в вашем кластере, а так же для создания или изменения отдельных ресурсов.

  ![Картинка_1](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled.png?raw=true)
  
  ### Сервис предоставляет следующий функционал:

  - Просмотр существующих приложений
  - Создание приложения
  - Настройка приложения
  1. Инициализация переменных окружения
  2. Указание портов
  3. Инициализация томов
  - Удаление приложения
  - Авторизация пользователя
  - Просмотр деталей пользователя на странице пользователя

  ### Приложение делится на несколько ключевых страниц:

  - Страница авторизации

  ![Картинка_2](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%201.png?raw=true)

  - Главная страница

  ![Картинка_3](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%202.png?raw=true)
  
  ### На главной странице отображаются все существующие приложения и краткая информация о них:

  - Имя
  - Дата и время создания
  - Количество работающих реплик
  - Количество неработающих реплик

  ![Картинка_4](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%203.png?raw=true)

  ### Сверху от списка приложений находится строка поиска для оптимизации процесса поиска приложения среди существующих:

  ![Картинка_5](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%204.png?raw=true)

  ### Поиск производится по нестрогому совпадению.

  - Страница создания приложения

  ![Картинка_6](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%205.png?raw=true)

  - Страница приложения

  ### При клике на приложение открывается страница приложения с данными о выбранном приложении и функционалом:
  
  - Описание
  - Последний релиз
  - Версия
  - Элемены управления настройкой приложения 

  ![Картинка_7](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%206.png?raw=true)

  ### Также, на данной странице находятся 3 вкладки:

  - ENV
  - PORTS
  - VOLUMES

  ### С помощью данных вкладок можно переключать правое меню настройки приложения.
  
  - На вкладке "ENV"

  ![Картинка_8](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%207.png?raw=true)

  - На вкладке "PORTS" можно настроить порты приложения

  ![Картинка_9](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%208.png?raw=true)

  - На вкладке "VOLUMES" можно настроить тома приложения

  ![Картинка_10](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%207.png?raw=true)

  ### На странице находится информация о всех репликах приложения:

  - Имя
  - Версия
  - Статус
  - Псевдоним

  ![Картинка_11](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%209.png?raw=true)

  ### и также содержатся элементы управления:

  ![Картинка_12](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2010.png?raw=true)

  - Кнопка запуска реплики:

  ![Картинка_13](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2011.png?raw=true)

  - Кнопка остановки реплики:

  ![Картинка_14](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2012.png?raw=true)

  - Кнопка перезагрузки реплики:

  ![Картинка_15](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2013.png?raw=true)

  - Кнопка удаления реплики:

  ![Картинка_16](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2014.png?raw=true)


  ## Авторизация

  ### Авторизация происходит по номеру телефона через user-service.
  ### Для того, чтобы авторизироваться в приложении, необходимо:

  1. Перейти на страницу авторизации. Это можно сделать кликнув по кнопке "LOGIN" в шапке приложения:
  
  ![Картинка_17](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2015.png?raw=true)

  ### Страница авторизации: 

  ![Картинка_18](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%201.png?raw=true)

  2. Вводим свой номер телефона:

  ![Картинка_19](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2016.png?raw=true)

  ### Нажимаем кнопку "SUBMIT

  3. На введенный номер телефона придет SMS с кодом подтверждения, который необходимо ввести в поле, запрашивающее код подтверждения.

  ![Картинка_20](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2017.png?raw=true)

  ### После чего открывается Главная страница со всеми доступными приложениями.
  
  ![Картинка_21](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%202.png?raw=true)


  ## Создание приложения

  ### Для того, чтобы создать приложение, необходимо

  1. Переходим на главную страницу (она же страница поиска по доступным приложениям). Это можно сделать, нажав на "Лупу" в шапке приложения:

  ![Картинка-22](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2015.png?raw=true)

  2. Нажимаем на кнопку "NEW APP" справа от строки поиска:

  ![Картинка_23](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2018.png?raw=true)
  
  ### Откроется страница создания приложения.

  ![Картинка_24](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2019.png?raw=true)

  3. Заполняем поля в форме на странице создания приложения.

  ![Картинка_25](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2020.png?raw=true)

  4. Нажимаем на кнопку "CREATE":

  ![Картинка_26](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2021.png?raw=true)

  ### Открывается страница созданного приложения.


  ## Развёртывание приложения

  ### Для того, чтобы развернуть приложение, необходимо:

  1. Переходим на главную страницу (она же страница поиска по доступным приложениям). Это можно сделать, нажав на "Лупу" в шапке приложения:

  ![Картинка_27](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2015.png?raw=true)

  ### Открывается главная страница.

  ![Картинка_28](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2022.png?raw=true)

  2. С помощью строки поиска находим необходимое приложение в списке и кликаем по нему правой кнопкой мыши:
  
  ![Картинка_29](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2023.png?raw=true)

  ### Откроется страница приложения:

  ![Картинка_30](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2024.png?raw=true)

  3. Ориентируясь на вкладки "ENV", "PORTS", "VOLUMES"

  ![Картинка_31](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2025.png?raw=true)

  ### настраиваем приложение его под свои нужды:

  1. "ENV" - настраиваем перемменные окружения

  ![Картинка_32](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2026.png?raw=true)

  - Кнопка "+" добавляет переменную в список

  ![Картинка_33](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2027.png?raw=true)

  - Кнопка "Trash" удаляет переменную из списка

  ![Картинка_34](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2028.png?raw=true)

  - Кнопка "Save" сохраняет изменения

  ![Картинка_35](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2029.png?raw=true)


  2. "PORTS" - настраиваем порты приложения

  ![Картинка_36](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2030.png?raw=true)

  - Кнопка "+" добавляет порт в список

  ![Картинка_37](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2027.png?raw=true)

  - Кнопка "Trash" удаляет порт из списка

  ![Картинка_38](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2028.png?raw=true)

  - Кнопка "Save" сохраняет изменения

  ![Картинка_39](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2029.png?raw=true)


  3. "VOLUMES" - настраиваем тома приложения

  ![Картинка_40](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2031.png?raw=true)

  - Кнопка "+" добавляет том в список

  ![Картинка_41](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2027.png?raw=true)

  - Кнопка "Trash" удаляет том из списка

  ![Картинка_42](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2028.png?raw=true)

  - Кнопка "Save" сохраняет изменения

  ![Картинка_43](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2029.png?raw=true)


  4. Выбираем версию и вписываем псевдоним:

  ![Картинка_44](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2032.png?raw=true)

  5. Нажимаем на кнопку "DEPLOY":  

  ![Картинка_45](https://github.com/DanilaPichugin/Png_photos/blob/main/Untitled%2033.png?raw=true)
  `

  // eslint-disable-next-line react/no-children-prop
  return <ReactMarkdown plugins={[gfm]} children={markdown} />
}
