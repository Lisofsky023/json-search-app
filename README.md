```cd json-search-app```
```npm i```
```npm start```

NodeJs - v20.6.1

Примечание к предупреждению в консоли:

Во время разработки приложения я столкнулся с предупреждением findDOMNode is deprecated in StrictMode, возникающим при использовании компонента InputMask из библиотеки react-input-mask. Это предупреждение связано с устаревшим методом findDOMNode, который используется внутри react-input-mask.

Я предпринял следующие шаги для решения этой проблемы:

Попытался обновить react-input-mask до последней версии, чтобы проверить, не была ли проблема исправлена.
Реализовал обходной путь с использованием forwardRef и inputRef, чтобы минимизировать зависимость от findDOMNode.

К сожалению, проблема осталась, и я пришел к выводу, что это ограничение текущей реализации react-input-mask. Так как это предупреждение не влияет на функциональность приложения и возникает из-за внешней библиотеки, я принял решение оставить его без изменений в текущем задании. Это предупреждение не оказывает негативного влияния на работоспособность приложения, но я осведомлен о его наличии и потенциальном влиянии в будущем. В продакшн-версии приложения я бы рассмотрел использование других решений или написание собственного компонента для маскировки ввода, чтобы полностью исключить зависимость от findDOMNode.
