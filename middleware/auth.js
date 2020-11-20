export default function ({ store, error, redirect }) {
  setTimeout(() => {
    if (!store.state.token) {
      redirect('/login')
    }
  }, 100);
}
