import { Table } from '@mantine/core';
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function Home() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, 'users')
        getDocs(collectionRef)
        .then((snapshots) => {
            snapshots.docs.forEach((doc) => {
                console.log('snapshots', typeof doc.data());
                setUsers([doc.data()]);
            })
        });
    }, [])
    return (<>
    <h1>Users List</h1>
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>First Name</Table.Th>
          <Table.Th>Last Name</Table.Th>
          <Table.Th>Teaching Language</Table.Th>
          <Table.Th>Learning Language</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody> {users.length > 0 && users.map((user, i) => (
        <Table.Tr key={i}>
            <Table.Td>{user.firstname}</Table.Td>
            <Table.Td>{user.lastname}</Table.Td>
            <Table.Td>{user.teachingLanguage}</Table.Td>
            <Table.Td>{user.learningLanguage}</Table.Td>
        </Table.Tr>
        ))}</Table.Tbody>
    </Table>
   
    <Link to="/login">Login</Link>
    <Link to="/signup">Sign Up</Link>
    </>)
}