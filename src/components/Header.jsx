import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes['signin-container']}>
        <button className={classes.btn}>Sign In</button>
      </div>
      <div className={classes['title-container']}>
        <h1>MD CHAT</h1>
      </div>
      
    </div>
  )
}

export default Header;