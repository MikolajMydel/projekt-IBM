import styles from "./PageNavigation.module.scss";

const PageNavigation = (props) => {
    return (
        <nav className={styles.Navigation}>
            {props.goBackwards ?
                <button className={styles.NavigationBackwards} onClick={props.goBackwards}>
                    ◀
                </button>
            : ""}

            {props.goForwards ?
                <button className={styles.NavigationForwards} onClick={props.goForwards}>
                    ▶
                </button>
            : ""}
        </nav>
    )
}

export default PageNavigation;