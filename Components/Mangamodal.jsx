import React, { useEffect, useState } from "react";
import { Text, Badge, Dropdown } from "@nextui-org/react";
import Image from "next/image";
import styles from "../styles/Animemodal.module.css";
import { useFirebase } from "@/context/firebaseContext";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const Mangamodal = ({ detail }) => {
  const [selected, setSelected] = useState(new Set(["Status"]));
  const [favourite, setFavourite] = useState(false);
  const { updateUserLists, checkUserCookies } = useFirebase();

  //console.log(detail);

  const mapVal = {
    Reading: "Mreading",
    Completed: "Mcompleted",
    "On Hold": "MonHold",
    Dropped: "Mdropped",
    "Plan To Read": "MplanToRead",
  };

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  var val = 0;
  var val2 = 0;

  const updateFavourite = async () => {
    const ref = JSON.parse(localStorage.getItem("Mfavourites")) || [];
    if (favourite) {
      setFavourite(false);
      const index = ref.indexOf(detail.manga_id);
      if (index > -1) ref.splice(index, 1);
      await updateUserLists(detail, null, "Mfavourites", false);
    } else {
      setFavourite(true);
      ref.push(detail.manga_id);
      await updateUserLists(detail, "Mfavourites", null, false);
    }

    localStorage.setItem("Mfavourites", JSON.stringify(ref));
  };

  const updateList = async (key) => {
    const remove =
      JSON.parse(localStorage.getItem(mapVal[selectedValue])) || [];

    const add = JSON.parse(localStorage.getItem(mapVal[key])) || [];
    const index = remove.indexOf(detail.manga_id);
    if (index > -1) remove.splice(index, 1);

    add.push(detail.manga_id);

    await updateUserLists(detail, mapVal[key], mapVal[selectedValue], false);

    localStorage.setItem(mapVal[selectedValue], JSON.stringify(remove));
    localStorage.setItem(mapVal[key], JSON.stringify(add));
  };

  useEffect(() => {
    // console.log(detail);
    if (checkUserCookies()) {
      const favourites = JSON.parse(localStorage.getItem("Mfavourites"));
      const completed = JSON.parse(localStorage.getItem("Mcompleted"));
      const dropped = JSON.parse(localStorage.getItem("Mdropped"));
      const onHold = JSON.parse(localStorage.getItem("MonHold"));
      const planToRead = JSON.parse(localStorage.getItem("MplanToRead"));
      const reading = JSON.parse(localStorage.getItem("Mreading"));

      completed.find((e) => e == detail.manga_id) &&
        setSelected(new Set(["Completed"]));
      dropped.find((e) => e == detail.manga_id) &&
        setSelected(new Set(["Dropped"]));
      onHold.find((e) => e == detail.manga_id) &&
        setSelected(new Set(["On Hold"]));
      planToRead.find((e) => e == detail.manga_id) &&
        setSelected(new Set(["Plan To Read"]));
      reading.find((e) => e == detail.manga_id) &&
        setSelected(new Set(["Reading"]));
      favourites.find((e) => e == detail.manga_id) && setFavourite(true);
    }
  }, []);

  return (
    <div className={styles.contain}>
      <div className={styles.image}>
        <Image
          css={{ borderRadius: "15px" }}
          src={detail.main_picture}
          unoptimized={true}
          width={350}
          height={470}
          alt="NA"
        />
      </div>

      <div className={styles.contentM}>
        <Text
          css={{
            marginRight: "1rem",
            width: "800px",
            marginTop: "2rem",
            marginBottom: "0rem",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
          color="white"
          b
          size={40}
          className={styles.title}
        >
          {detail.title_english ? detail.title_english : detail.title}
        </Text>

        <div className={styles.badges}>
          {checkUserCookies() && (
            <div className={styles.fav} onClick={updateFavourite}>
              {favourite ? (
                <AiFillHeart color="red" className={styles.fav} />
              ) : (
                <AiOutlineHeart color="red" className={styles.fav} />
              )}
            </div>
          )}
          {/* <Badge size="md" css={{  margin:"0.1rem 0.2rem 1.5rem 0", padding:"0.5rem 1rem 0.5rem 1rem"}} color="primary" variant="flat" className={styles.head2}>{detail.sfw}</Badge> */}

          {checkUserCookies() && (
            <Dropdown>
              <Dropdown.Button
                flat
                color="secondary"
                css={{ tt: "capitalize", borderRadius: "35px", height: "32px" }}
              >
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
                onAction={(key) => updateList(key)}
              >
                <Dropdown.Item key="Reading">Reading</Dropdown.Item>
                <Dropdown.Item key="Dropped">Dropped</Dropdown.Item>
                <Dropdown.Item key="Plan To Read">Plan To Read</Dropdown.Item>
                <Dropdown.Item key="On Hold">On Hold</Dropdown.Item>
                <Dropdown.Item key="Completed">Completed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className={styles.lY}>
          <div className={styles.car}>
            <div className={styles.head}>Chapters</div>
            {detail.chapters ? (
              <>
                <div className={styles.bod}>{detail.chapters}</div>
              </>
            ) : (
              <>
                <div className={styles.bod}>N/A</div>
              </>
            )}
          </div>

          <div className={styles.car}>
            <div className={styles.head}>Released</div>
            <div className={styles.bod}>{detail.start_date}</div>
          </div>
          <div className={styles.car}>
            <div className={styles.head}>Status</div>
            <div className={styles.bod}>{detail.status}</div>
          </div>
          <div className={styles.car}>
            <div className={styles.head}>Type</div>
            <div className={styles.bod}>{detail.type}</div>
          </div>

          <div className={styles.car}>
            <div className={styles.head}>MAL Score</div>
            <div className={styles.bod}>{detail.score}</div>
          </div>
        </div>
        <div className={styles.last}>
          <div className={styles.genre}>Genre</div>
          <div style={{ marginBottom: "24px" }}>
            {JSON.parse(detail.genres.replace(/'/g, '"')).map((gen, i) => {
              if (gen !== "Unknown" && val == 0)
                return (
                  <Badge
                    size="md"
                    key={i}
                    css={{
                      color: "white",
                      backgroundColor: "teal",
                      margin: "0.1rem 0.2rem 0.1rem 0",
                    }}
                    isSquared
                    color="secondary"
                    variant="flat"
                  >
                    {gen}
                  </Badge>
                );
            })}
            {JSON.parse(detail.themes.replace(/'/g, '"')).map((gen, i) => {
              if (gen !== "Unknown" && val2 == 0)
                return (
                  <Badge
                    size="md"
                    key={i}
                    css={{
                      color: "white",
                      backgroundColor: "teal",
                      margin: "0.1rem 0.2rem 0.1rem 0",
                      padding: "6px 8px",
                    }}
                    isSquared
                    color="secondary"
                    variant="flat"
                  >
                    {gen}
                  </Badge>
                );
            })}
          </div>

          <div className={styles.genre}>Synopsis</div>
          {/* <div className="hidden" style={{height:"10vh", overflow:'hidden'}}> */}
          <div className={styles.scroll}>{detail.synopsis}</div>
          {/* </div> */}

          {/* <div style={{marginBottom:"24px"}}>
              <div>Studios</div>
              { 
                        detail.studios.split(",").map((gen,i)=>{
                           if(gen!=="Unknown" && val==0) return <Badge size="md" key={i} isSquared css={{color:"black", backgroundColor:"white", margin:"0.1rem 0.2rem 0.1rem 0"}} >
                            {gen}
                          </Badge>
                                  
                        })
                        
                    }
                         
                      
                        
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Mangamodal;
