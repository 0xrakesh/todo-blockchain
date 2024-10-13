// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract TodoList {
    uint public taskCount;

    constructor() {
        taskCount = 0;
        createTask("Deployment!");
    }

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    mapping(uint => Task) public tasks;

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function getTask() public view returns(Task[] memory) {
        Task[] memory taskArray = new Task[](taskCount);

        for (uint i = 1; i <= taskCount; i++) {
            taskArray[i - 1] = tasks[i];
        }

        return taskArray;
    }

}