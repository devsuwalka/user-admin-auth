import { useState } from 'react';

export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="text" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}








// import { useState } from 'react';

// export default function VerifyPage() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');

//   const handleVerify = async (e) => {
//     e.preventDefault();

//     const res = await fetch('/api/verify-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div>
//       <h2>Verify OTP</h2>
//       <form onSubmit={handleVerify}>
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//         <input type="text" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
//         <button type="submit">Verify</button>
//       </form>
//     </div>
//   );
// }




// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function VerifyOtp() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const router = useRouter();

//   const handleVerify = async () => {
//     const res = await fetch('/api/verify-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert('Verified successfully!');
//       router.push('/user/signin');
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Verify Your Email</h2>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
//       <button onClick={handleVerify}>Verify</button>
//     </div>
//   );
// }
// // pages/user/verify.js
// 'use client'
// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function VerifyOTP() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const router = useRouter();

//   const handleVerify = async () => {
//     const res = await fetch('/api/verify-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();
//     alert(data.message);

//     if (res.ok) {
//       router.push('/user/signin');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Verify OTP</h2>
//       <input
//         type="email"
//         placeholder="Your Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />
//       <br />
//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={e => setOtp(e.target.value)}
//       />
//       <br />
//       <button onClick={handleVerify}>Verify</button>
//     </div>
//   );
// }
