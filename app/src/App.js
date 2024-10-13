import { useEffect, useState } from 'react';
import TodoListABI from './TodoList.json'
import Web3 from 'web3';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const RequestAccount = async () => {
      let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]); 
    }

    const ConnectContract = async () => {
      const web3Provider = new Web3(window.ethereum);
      const todoContract = new web3Provider.eth.Contract(TodoListABI.abi, TodoListABI.networks[5777].address);
      setContract(todoContract);  
    }

    if (window.ethereum === undefined) {
      alert("Please install MetaMask");
      return;
    } else {
      RequestAccount();
      ConnectContract();
    }
  }, []);

  useEffect(() => {
    GetTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[contract])

  const GetTask = async () => {
    if(!contract) {
      console.error("Contract not initialized");
      return;
    }
    try {
      console.log(contract);
      const tasks = await contract.methods.getTask().call();
      tasks.forEach(ele => {
        setList((prev) => [...prev, {id:ele.id, content:ele.content, completed: ele.completed}]);
      });
    }
    catch(err) {
      console.error(err);
    }
  }

  const AddTask = async () => {
    if (!contract || !account) {
      console.error("Contract or account not initialized");
      return;
    }

    let curTask = task === "" ? "Code Task" : task;
    
    try {
      const receipt = await contract.methods.createTask(curTask).send({
        from: account,
        gas: 6000000, 
      });
      let lastTask = list[list.length-1].id.toString();
      let idx = parseInt(lastTask)+1;
      setList((prev) => [...prev, {id:idx.toString(), content: task, completed: "false"}])
    } catch (error) {
      console.error("Error while adding task:", error);
    }
  }

  useEffect(() => {
    console.log(list);
  },[list]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-white text-md my-2">Tasks</h1>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter task"
          className='my-2'
        />
        <table class="table-fixed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((ele, index) => (
              <tr key={index}>
                <td>{ele.id.toString()}</td> {/* Convert BigInt to string for display */}
                <td>{ele.content}</td>
                <td>{ele.completed ? 'Yes' : 'No'}</td> {/* Convert boolean to 'Yes' or 'No' */}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={AddTask}>Add task</button>
      </header>
    </div>
  );
}

export default App;
