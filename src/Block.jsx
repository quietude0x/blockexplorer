import { useEffect, useState } from 'react';

function Block({blockNumber, setBlockNumber, alchemy, AllTxOfBlock, setAllTxOfBlock}) {
    const [contract, setContract] = useState([]);
    const [collName, setCollName] = useState("");
    const [collImg, setCollImg] = useState("");
    const [floor, setFloor] = useState(0);
    const [supply, setSupply] = useState(0);

    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumber(await alchemy.core.getBlockNumber());
        }
        async function getBlockWithTransactions() {
            setAllTxOfBlock(await alchemy.core.getBlockWithTransactions());
        }
        getBlockNumber();
        getBlockWithTransactions();
    });

    async function onChangeNFT(evt) {
        const contract = evt.target.value;
        setContract(contract);
    }

    async function getData() {
        const response = await alchemy.nft.getContractMetadata(contract);
        console.log(response);
        if(response) {
            setCollName(response.name);
            setCollImg(response.openSea.imageUrl);
            setFloor(response.openSea.floorPrice);
            setSupply(response.totalSupply);
        }
    }
    
    return (<>
        <h1> lil explorer </h1>
            <div className="App">Latest block Number: {blockNumber}</div>
        <p> <br/></p> 

        Type a nft contract to get info 
        <label>
            <input placeholder="0x..." value={contract} onChange={onChangeNFT}></input>
        </label>

        <button onClick={getData}>Get metadata</button>

        <p> NFT DATA : </p>

        <p> name : {collName} </p>
        <p> image : <img width="10%" src={collImg} /> </p>
        <p> floor : {floor} ether </p>
        <p> supply : {supply}</p>
    </>
    );
}

export default Block;