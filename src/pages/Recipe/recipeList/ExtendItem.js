import { v4 as uuidv4 } from "uuid";
import { MdOutlineSaveAlt } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import classes from "./ExtendItem.module.css";

function ExtendItem({ item, category }) {
  return (
    <div className={classes["ext-item"]}>
      {item.video_url && (
        <div className={classes["item-video"]}>
          <video
            title="title"
            width="100%"
            height="100%"
            src={`${item.video_url}#t=0.001`}
            type="video/mp4"
            className={classes.video}
            controls
          >
            <track kind="captions" />
          </video>
        </div>
      )}
      <div className={classes.ingredients}>
        <p>Ingredients: </p>
        <ul>
          {item.sections[0].components.map((item) => (
            <li key={uuidv4()}>{item.ingredient.name}, </li>
          ))}
        </ul>
      </div>
      <div className={classes["how-to"]}>
        <p>How to Cook :</p>
        <ol>
          {item.instructions.map((item) => (
            <li key={uuidv4()}>{item.display_text}</li>
          ))}
        </ol>
      </div>
      {category === "0" && (
        <button type="button" className={classes["summit-btn"]}>
          <MdOutlineSaveAlt color="#ffffff" size={15} />
          Save recipe
        </button>
      )}
      {category === "1" && (
        <button type="button" className={classes["summit-btn"]}>
          <AiFillDelete color="#ffffff" size={15} />
          Delete recipe
        </button>
      )}
    </div>
  );
}

export default ExtendItem;