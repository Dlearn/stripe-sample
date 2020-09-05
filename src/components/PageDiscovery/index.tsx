import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import iconItem0 from "../../images/item0.jpg";
import iconItem1 from "../../images/item1.jpg";
import iconItem2 from "../../images/item2.jpg";
import styles from "./styles.module.css";

type Item = { id: number; price: number; title: string };

type Props = {
  items: Item[];
  itemAmounts: { [id: number]: number };
  setItemAmounts: (itemAmounts: { [id: number]: number }) => void;
};

export default function PageDiscovery({
  items,
  itemAmounts,
  setItemAmounts,
}: Props) {
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
        {items.map((item: Item, index: number) => {
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
      <Button>Proceed to checkout</Button>
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
        <div>${price}</div>
        <div className={styles.amountSelector}>
          <Button
            className={styles.addMinusButton}
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
