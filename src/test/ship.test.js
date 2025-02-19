import { Ship } from '../components/ship.js'

describe("Ship", () => {
  let carrier
  
  describe("instantiation", () => {
    beforeEach(() => {
      Ship.shipCounter = 0
      carrier = new Ship('carrier');
    })

    it("should construct a new ship instance", () => {
      expect(carrier.getSize()).toBe(5);
    })

    it('should set, and enable get of, a ships type', () => {
      expect(carrier.getType()).toBe('carrier');
    })
    
    it("should have a unique Id", () => {
      const battleShip = new Ship('battleship');
      expect(carrier.getId()).toBe('ship-1');
      expect(battleShip.getId()).not.toBe('ship-1');
      expect(battleShip.getId()).toBe('ship-2');
    })
  })
  
  describe("hits", () => {
    describe("when there are none", () => {
      it("getHits() returns an empty array", () => {
        expect(carrier.getHits()).toEqual(0);
      })
    })
    
    describe("when there are some", () => {
      it("getHits() returns an array filled with hit coords", () => {
        expect(carrier.getHits()).toEqual(0);
        carrier.hit()
        expect(carrier.getHits()).toEqual(1);
      })
      
      it("they cannot exceed the size of the ship", () => {
        for (let i = 0; i < carrier.getSize(); i++) {
          carrier.hit();
        }
        expect(carrier.getHits()).toBe(5);
        expect(carrier.hit()).toEqual("cannot receive more hits than ship's size");
      })
    })
  })
  
  describe("isSunk()", () => {
    const carrier = new Ship('carrier');

    it("returns false if hits < size", () => {
      expect(carrier.isSunk()).toBeFalsy()
    })
    
    it("returns true if hits === size", () => {
      for (let i = 0; i < carrier.getSize(); i++) {
        carrier.hit();
      }
      expect(carrier.getSize()).toBe(5);
      expect(carrier.getHits()).toBe(5);
      expect(carrier.isSunk()).toBeTruthy();
    })
  })

})