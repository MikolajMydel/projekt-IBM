import react from "react";
import styles from "./CharactersList.module.scss";

class CharactersList extends react.Component {
    render(){
        return (
            <div className={styles.List}>
                <h1 className={styles.ListHeader}>Added characters</h1>
                <div className={styles.ListCharacters}>
                    { this.props.characters.map((character, index) => {
                        return (
                            <div className={styles.Character}>
                                {character[0]}
                                <div className={styles.CharacterButtons}>
                                    <button
                                        className={styles.CharacterEdit}
                                        onClick={() => this.props.editCharacter(index)}
                                    >
                                        edit
                                    </button>
                                    <button
                                        className={styles.CharacterRemove}
                                        onClick={() => this.props.removeCharacter(index)}
                                    >
                                        rem
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