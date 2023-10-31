import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from the local JSON DB server
    axios.get('http://localhost:8001/transactions').then((response) => {
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    });
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...transactions, newTransaction]);
  };

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <SearchBar onSearch={handleSearch} />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default App;
