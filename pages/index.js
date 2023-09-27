import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getFileInformation } from "../../posts/getData";
import { useState } from "react";

export default function Home({ allPostsData }) {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState({show:false, indexNumber:undefined});
  const [changeText, setChangeText] = useState('')

  function handleClick(e) {
    e.preventDefault();
    if (list.length === 0) {
      setList([text]);
    } else {
      setList((prev) => {
        return [...prev, text];
      });
    }
  }

  function handleDelete(listItem, indexNumber) {
    const removeDuplicate = list.filter((textItem, index) => {
      if (textItem === listItem && indexNumber === index) {
        return false;
      }
      return true;
    });
    setList(removeDuplicate);
  }



  function changeHandler(e, indexNumber) {
   
    e.preventDefault()
    const newList = [...list];
    newList[indexNumber] = changeText
    setList(newList);
    
  }

 
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          onSubmit={(e) => {
            handleClick(e);
          }}
        >
          <h1>Your friendly writing note here</h1>
          <label htmlFor="Heres your input to add to your list" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="newItem"
            type="text"
          />
          <button type="submit">Add</button>
        </form>
        {list.length > 0 && (
          <>
            <h4>Here is your list of items below</h4>
            {list.map((listItem, indexNumber) => {
              return (
                <>
                  <button key={indexNumber} className={styles.list}>
                    {listItem}
                  </button>
                  <div>
                    <div>
                      <span className={styles.rowGang} onClick={() => handleDelete(listItem, indexNumber)}>
                        Remove Item
                      </span>

                      <span className={styles.rowGang} onClick={() => setUpdateText({show: true, indexNumber})}>
                        Update Item
                      </span>
                    </div>
                    {updateText.show && updateText.indexNumber === indexNumber && (
                        <>
                        <form>
                          <label htmlFor="updateText">Update Text</label>
                          <input
                            type="text"             
                            onChange={(e) => setChangeText(e.target.value)}
                          />
                          <button type="submit" onClick={(e) =>changeHandler(e, indexNumber)}> Change </button>
                        </form>
                        </>
                      )}
                  </div>
                </>
              );
            })}
          </>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}


