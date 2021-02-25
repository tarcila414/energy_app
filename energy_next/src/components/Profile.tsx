import styles from "../styles/components/Profile.module.css";

export function Profile() {
    return (
        <div className={styles.profileContainer}>
           <img src="perfil.jpg" alt="Tarcila"/> 
           <div>
               <strong>Tarcila</strong>
               <p>
                    <img src="icons/level.svg" alt=""/>
                    Level 1
                </p>
           </div>
        </div>
    )
}