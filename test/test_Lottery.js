const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("Lottery", function () {

  let lotteryFactory, lottery
  beforeEach(async function () {
    accounts = await ethers.getSigners()
    Aplayer = accounts[1]
    Bplayer = accounts[2]
    Cplayer = accounts[3]

    lotteryFactory = await ethers.getContractFactory("Lottery")
    lottery = await lotteryFactory.deploy()
  })

  it("Should start with lottery id 1", async function () {
    const currentValue = await lottery.getLotteryId()
    const expectedValue = "1"
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Should let enter one player", async function () {
    await lottery.enterLottery(
      { value: ethers.utils.parseEther("0.01")}
    )

    const players = await lottery.getPlayers()
    assert.equal(accounts[0].address, players[0])
    assert.equal(1, players.length)
  })
  
  it("Should let multiple accounts to enter the lottery", async function () {
    await lottery.enterLottery({
      value: ethers.utils.parseEther("0.01"),
    })

    await lottery.connect(accounts[1]).enterLottery({
      value: ethers.utils.parseEther("0.01"),
    })

    await lottery.connect(accounts[2]).enterLottery({
      value: ethers.utils.parseEther("0.01"),
    })

    const players = await lottery.getPlayers()

    assert.equal(accounts[0].address, players[0])
    assert.equal(accounts[1].address, players[1])
    assert.equal(accounts[2].address, players[2])
    assert.equal(3, players.length)
  })

  it("Should not let a player enteer with less than 0.01Eth", async function () {
    try {
      await lottery.methods.enterLottery({
        from: accounts[0],
        value: ethers.utils.parseEther("0.001"),
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('Only Owner can pick a winner', async () => {
    try {
      await lottery.methods.pickWinner({
        from: accounts[1],
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })
  // it('Should sends money to the winner and resets the players array', async () => {
  //   await lottery.enterLottery({
  //     value: ethers.utils.parseEther("0.01"),
  //   })

  //   const initialBalance = await accounts[0].getBalance()

  //   await lottery.pickWinner()

  //   const finalBalance = await accounts[0].getBalance()

  //   const difference = finalBalance - initialBalance
  //   assert(difference > ethers.utils.parseEther ('1.8'))

  //   const players = await lottery.getPlayers()
  //   assert.equal(0, players.length)

  //   const balance = await lottery.options.address.getBalance(lottery.options.address)
  //   assert.equal(0, balance)
  // })
})