import { useState } from 'react';
import { useRouter } from 'next/router'; // ✅ Import router
import styles from '../../styles/Signup.module.css';

export default function Signup() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', roll: '', branch: ''
  });

  const router = useRouter(); // ✅ Init router

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      // ✅ Save email in localStorage or pass via query if needed
      localStorage.setItem('userEmail', form.email);
      router.push('/user/verify'); // ✅ Redirect after OTP sent
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Your Friend Account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={styles.input} placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        <input className={styles.input} placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className={styles.input} placeholder="Roll No" onChange={(e) => setForm({ ...form, roll: e.target.value })} />
        
        <select className={styles.select} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="EEE">EEE</option>
        </select>
        
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}


// // pages/user/signup.js
// import { useState } from 'react';
// import styles from '../../styles/Signup.module.css';

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: '', mobile: '', email: '', roll: '', branch: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Create Your Friend Account</h1>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <input className={styles.input} placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
//         <input className={styles.input} placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
//         <input className={styles.input} placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input className={styles.input} placeholder="Roll No" onChange={(e) => setForm({ ...form, roll: e.target.value })} />
        
//         <select className={styles.select} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
//           <option value="">Select Branch</option>
//           <option value="CSE">CSE</option>
//           <option value="ECE">ECE</option>
//           <option value="ME">ME</option>
//           <option value="EEE">EEE</option>
//         </select>
        
//         <button type="submit" className={styles.button}>Sign Up</button>
//       </form>
//     </div>
//   );
// }
