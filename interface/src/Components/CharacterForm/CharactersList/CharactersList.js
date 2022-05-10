import react from "react";
import styles from "./CharactersList.module.scss";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiPencil } from "react-icons/bi";

import {CSVLink} from "react-csv";

class CharactersList extends react.Component {

    getPrediction = (index) => {
        const prediction = this.props.characters[index][15];
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

                <div className={styles.ListButtons}>
                    <button onClick={this.props.check}>
                        Verify
                    </button>

                    <CSVLink
                        data={this.props.characters}
                        headers={this.props.characters[0] && this.props.characters[0].length > 15 ? this.props.fields.concat(["IsBad"]) : this.props.fields}
                        filename={`${this.props.characters.length}_Marvel_characters.csv`}
                    >
                        <button>
                            Export
                        </button>
                    </CSVLink>

                </div>

                {this.props.loading ?
                    <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    :
                    ""
                }
            </div>
        )
    }
}

export default CharactersList;