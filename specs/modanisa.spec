# Vue.js -> To do application acceptance tests

To execute this specification, use
	npm test

Background;
* Open todo application

## Add task in empty list
* Add task "buy some milk"
* Check "buy some milk" is exist

## Add new task given list
* Add task "buy some milk"
* Add task "enjoy the assignment"
* Check "enjoy the assignment" is added under the "buy some milk" todo

## Item marked as done 
* Add task "buy some milk"
* Click check box near to "buy some milk"
* To do "buy some milk" is checked

## Item marked as undone
* Add task "buy some milk"
* Click check box near to "buy some milk"
* Click check box near to "buy some milk"
* To do "buy some milk" is undone

## Delete item and empty list
* Add task "rest for a while"
* Delete "rest for a while" in to do list

## Delete an item from the todo list 
* Add task "rest for a while"
* Add task "drink water"
* Delete "rest for a while" in to do list
* Check "drink water" is exist


A tear down step for every scenario
___
* Clear all tasks
