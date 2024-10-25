import buildMerkleTree from '../utils/merkle_tree';
import Transaction from './transaction';
import ProofOfWork from '../consensus/pow'
 
// Block class
class Block {
    readonly nonce: number;
    readonly blockHeight: number;
    readonly timestamp: number;
    readonly transactions: Transaction[];
    trxCount: number;
    merkleroot: string;
    readonly prevBlockHash: string;
    readonly blockHash: string;

    constructor (blockHeight: number, transactions: Transaction[], prevBlockHash: string) {
        this.nonce = 0;
        this.blockHeight = blockHeight;
        this.transactions = transactions;
        this.trxCount = transactions.length;
        this.timestamp = new Date().toISOString();
        this.merkleroot = '';
        this.prevBlockHash = prevBlockHash;
        this.blockHash = '';
    }

    SetBlockProps(MiningDifficulty: number) {
        this.merkleroot = this.CalculateMerkleRoot();
        const blockDataAsString = `${this.blockHeight}${this.nonce}${JSON.stringify(this.transactions)}${this.merkleroot}${this.prevBlockHash}`;
        
        const { hash, nonce } = ProofOfWork(blockDataAsString, MiningDifficulty);
        
        this.blockHash = hash;
        this.nonce = nonce;
    }

    CalculateMerkleRoot(): string {
        return this.transactions.length ? buildMerkleTree(this.transactions) : '';
    }
}


export default Block;
