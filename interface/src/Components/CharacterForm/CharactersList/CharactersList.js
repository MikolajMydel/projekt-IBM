import react from "react";
import styles from "./CharactersList.module.scss";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiPencil } from "react-icons/bi";

class CharactersList extends react.Component {

    getPrediction = (index) => {
        const prediction = this.props.predictions[index];

        if (typeof prediction === "undefined") return "";
        else if (prediction) return "bad"

        return "good";
    }

    render(){
        return (
            <div className={styles.List}>
                <h1 className={styles.ListHeader}>Added characters</h1>
                <div className={styles.ListCharacters}>
                    {this.props.characters.map((character, index) => {
                        const prediction = this.getPrediction( index ).toUpperCase();

                        return (
                            <div className={styles.Character}>
                                {character[0]}

                                {prediction ?
                                <div className={styles.CharacterPrediction}>
                                    {prediction}
                                </div> : ""
                                }

                                <div className={styles.CharacterButtons}>
                                    <button
                                        className={styles.CharacterEdit}
                                        onClick={() => this.props.editCharacter(index)}
                                    >
                                        <BiPencil />
                                    </button>
                                    <button
                                        className={styles.CharacterRemove}
                                        onClick={() => this.props.removeCharacter(index)}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className={styles.ListButton} onClick={this.props.check}>
                    Verify
                </button>
            </div>
        )
    }
}

export default CharactersList;