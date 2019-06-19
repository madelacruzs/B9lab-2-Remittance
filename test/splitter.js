const Splitter = artifacts.require("Splitter");

const { toBN, toWei } = web3.utils;
const utils = require("ethers").utils;

// console.log(ethers.utils.formatBytes32String("DE LA CRUZ"));
// var alice, bob, carol;
// var instanceSplitter;

contract("Splitter", accounts => {
  const weiSendAmount = utils.parseEther("1");
  let splitter, alice, bob, carol, otherAcct;

  [alice, bob, carol, otherAcct] = accounts;

  beforeEach("deploy new Splitter", function() {
    return Splitter.new({ from: alice }).then(
      instance => (splitter = instance)
    );
  });

  //members should be set
  it("Should be able to split amount amount two members", async () => {
    const result = await splitter.splitEth(bob, carol, {
      from: alice,
      value: weiSendAmount
    });

    assert.equal(
      result.receipt.status,
      true,
      "splitMembers did not return true"
    );
  });

  it("Get Balance by Address (BOB)", async () => {
    const result = await splitter.splitEth(bob, carol, {
      from: alice,
      value: weiSendAmount
    });

    const bobWei = await splitter.balances(carol);
    let weiHalf = weiSendAmount / 2;
    assert.equal(weiHalf, bobWei, "Balance is not splitted for Bob.");
  });

  it("Get Balance by Address (Carol)", async () => {
    const result = await splitter.splitEth(bob, carol, {
      from: alice,
      value: weiSendAmount
    });

    const carolWei = await splitter.balances(carol);
    let weiHalf = weiSendAmount / 2;
    assert.equal(weiHalf, carolWei, "Balance is not splitted for Carol.");
  });

  //members should be set
  it("Should be able to withdraw Funds", async () => {
    await splitter.splitEth(bob, carol, {
      from: alice,
      value: weiSendAmount
    });
    const weiAmountwithdraw = utils.parseEther("0.5");

    const result = await splitter.withdrawFunds(weiAmountwithdraw, {
      from: bob
    });

    assert.equal(
      result.receipt.status,
      true,
      "withdraw Funds did not return true"
    );
  });
});
