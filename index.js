const contractadd = '0xd62b90ae3d5f2f27808a19d7a8d738c517830671';
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAllCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct votingsystem.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateIndex",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isregistered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isvoted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingended",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingstarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert('Wallet connected successfully');
    } catch (error) {
      alert('Error connecting wallet:' + error);
    }
  }
  else {
    alert('MetaMask is not installed');
  }
}

async function registerVoter() {
    try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractadd, abi, signer);
    const tx = await contract.registerVoter();
    await tx.wait();
    alert('Voter registered successfully');
  } catch (error) {
    alert('Error registering voter:' + error);
  }
}
async function addCandidate(params) {
    const candidatename = document.getElementById('candidateName').value;
    try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractadd, abi, signer);
    const tx = await contract.addCandidate(candidatename);
    await tx.wait();
    alert('Candidate added successfully');
  } catch (error) {
    alert('Error adding candidate:' + error);
  }
}

async function startVoting() {
    try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractadd, abi, signer);
    const tx = await contract.startVoting();
    await tx.wait();
    alert('Voting started successfully');
  } catch (error) {
    alert('Error starting voting:' + error);
  }
}
async function endVoting() {
    try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractadd, abi, signer);
    const tx = await contract.endVoting();
    await tx.wait();
    alert('Voting ended successfully');
  } catch (error) {
    alert('Error ending voting:' + error);
  }
}

async function loadcandidates() {
    try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractadd, abi, signer);
    const candidates = await contract.viewAllCandidates();
    const candidateSelect = document.getElementById('candidateSelect');
    candidates.forEach(candidate => {
        const option = document.createElement('option');
        option.value = candidate.name;
        option.textContent = candidate.name;
        candidateSelect.appendChild(option);
    });
  } catch (error) {
    alert('Error loading candidates:' + error);
  }
}

async function vote() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractadd, abi, signer);
        const selectedindex = document.getElementById('candidateSelect').selectedIndex-1;
        const selectedcandidate = document.getElementById('candidateSelect').options[selectedindex].value;
        if (selectedcandidate === '') {
            alert('Please select a candidate');
            return;
        }
        const tx = await contract.vote(selectedcandidate);
        await tx.wait();
        alert('Voted successfully');
        
    } catch (error) {
        alert('Error voting:' + error);
    }
}

async function viewcandidates(params) {
    try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractadd, abi, signer);
    const candidates = await contract.viewAllCandidates();
    console.log(candidates);
    alert(candidates);
  } catch (error) {
    alert('Error viewing candidates:' + error);
  }
}

async function getWinner(params) {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractadd, abi, signer);
        const winner = await contract.getWinner();
        console.log(winner);
        alert(winner);
    } catch (error) {
        alert('Error getting winner:' + error);
    }
}
window.addEventListener('load', loadcandidates);
