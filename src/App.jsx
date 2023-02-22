import "./App.css";
import { useState } from "react";
import Contacts from "./contacts.json";

const App = () => {
  const [firstSix, setfirstSix] = useState(Contacts.slice(0, 6));
  const [remContacts, setRemContacts] = useState(Contacts.slice(7));

  function getRandom() {
    let randomIndex = Math.floor(Math.random() * remContacts.length);
    let randomContact = remContacts[randomIndex];

    setfirstSix([randomContact, ...firstSix]);
    let filterArr = remContacts.filter((contact) => {
      if (contact.name !== randomContact.name) {
        return contact;
      }
    });
    setRemContacts(filterArr);
  }
//mats way of adding random contacts
  // const handleClick = () => {
  //   console.log('click')
  //   const restOfContacts = Contacts.filter(
  //     restContact => !firstSix.some(contact => contact.id === restContact.id)
  //   )
  // }

  function sortByName() {
    const sort = firstSix.sort((a, b) => a.name.localeCompare(b.name));
    setfirstSix([...sort]);
  }

  function sortByPopularity() {
    const sort = firstSix.sort((a, b) => a.popularity - b.popularity);
    setfirstSix([...sort]);
  }

  function deleteContact(id) {
    const filteredContacts = firstSix.filter(contact => contact.id !== id);
    setfirstSix(filteredContacts);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button type='button' onClick={getRandom}>Random contacts</button>
      <button type='button' onClick={sortByName}>Sort by name</button>
      <button type='button' onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {/* destruct all the values to make it more readable*/}
          {firstSix.map(({id, pictureUrl, popularity, wonEmmy, wonOscar, name}) => {
            return (
              <tr key={id}>
                <td>
                  <img
                    style={{ height: "150px" }}
                    src={pictureUrl}
                    alt="person"
                  />
                </td>
                <td>{name}</td>
                <td>{popularity}</td>
                <td>{wonOscar ? "🏆" : "❌"}</td>
                <td>{wonEmmy ? "🏆" : "❌"}</td>
                <td><button onClick={() => deleteContact(id)}>delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default App;
