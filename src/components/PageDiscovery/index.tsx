import React, { useEffect } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import iconItem0 from "../../images/item0.jpg";
import iconItem1 from "../../images/item1.jpg";
import iconItem2 from "../../images/item2.jpg";
import styles from "./styles.module.css";

type Item = { id: number; price: number; title: string };

type Props = {
  items: { [id: number]: Item };
  itemAmounts: { [id: number]: number };
  setCompletedPaymentIntent: (paymentIntent: string) => void;
  setItemAmounts: (itemAmounts: { [id: number]: number }) => void;
};

export default function PageDiscovery({
  items,
  itemAmounts,
  setCompletedPaymentIntent,
  setItemAmounts,
}: Props) {
  useEffect(() => {
    setCompletedPaymentIntent("");
  }, [setCompletedPaymentIntent]);

  const onDecrement = (id: number) => {
    const newItemAmounts = { ...itemAmounts };
    newItemAmounts[id] = itemAmounts[id] - 1;
    setItemAmounts(newItemAmounts);
  };

  const onIncrement = (id: number) => {
    const newItemAmounts = { ...itemAmounts };
    newItemAmounts[id] = itemAmounts[id] + 1;
    setItemAmounts(newItemAmounts);
  };

  return (
    <>
      <h3>Choose your items!</h3>
      <div className={styles.items}>
        {Object.values(items).map((item: Item, index: number) => {
          return (
            <ItemCard
              index={index}
              item={item}
              itemAmounts={itemAmounts}
              key={index}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          );
        })}
      </div>
      <Link to="/checkout">
        <Button
          disabled={
            Object.values(itemAmounts).reduce(
              (sum, currAmount) => sum + currAmount,
              0
            ) === 0
          }
        >
          Proceed to checkout
        </Button>
      </Link>
    </>
  );
}

type ItemCardProps = {
  index: number;
  item: Item;
  itemAmounts: { [id: number]: number };
  onDecrement: (id: number) => void;
  onIncrement: (id: number) => void;
};

const ItemCard = ({
  index,
  item,
  itemAmounts,
  onDecrement,
  onIncrement,
}: ItemCardProps) => {
  const { id, price, title } = item;
  return (
    <Card className={styles.card} key={index}>
      <ImageFromIndex index={index} />
      <div className={styles.cardDetails}>
        <div>{title}</div>
        <div>${Math.floor(price / 100)}</div>
        <div className={styles.amountSelector}>
          <Button
            className={styles.addMinusButton}
            disabled={itemAmounts[id] === 0}
            onClick={() => {
              onDecrement(id);
            }}
          >
            -
          </Button>
          <div>{itemAmounts[id]}</div>
          <Button
            className={styles.addMinusButton}
            onClick={() => {
              onIncrement(id);
            }}
          >
            +
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ImageFromIndex = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <Image alt={`item${index}`} fluid src={iconItem0} />;
    case 1:
      return <Image alt={`item${index}`} fluid src={iconItem1} />;
    default:
      return <Image alt={`item${index}`} fluid src={iconItem2} />;
  }
};
