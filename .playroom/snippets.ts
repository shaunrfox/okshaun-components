const snippets = [
  {
    group: 'Basics',
    name: 'Button (Primary)',
    code: '<Button variant="primary" onClick="">Save changes</Button>',
  },
  {
    group: 'Basics',
    name: 'Page Action Buttons',
    code: `<HStack gap="8">
  <Button variant="primary" onClick="">Primary</Button>
  <Button onClick="">Action</Button>
  <Button onClick="">Action</Button>
  <IconButton iconName="dots" altText="More" onClick="" />
</HStack>`,
  },
  {
    group: 'Basics',
    name: 'IconButton',
    code: `<HStack gap="8">
  <IconButton iconName="edit" altText="Edit row" variant="ghost" onClick="" />
  <IconButton iconName="trash" altText="Delete row" variant="danger" onClick="" />
</HStack>`,
  },
  {
    group: 'Layout',
    name: 'Card + Heading + Text',
    code: `<Card as="VStack" maxWidth="md">
  <VStack p="24" gap="8" alignItems="flex-start">
    <Heading level="h3">Build fast, style faster</Heading>
    <Text>Playroom now runs with static Panda CSS for reliable previews.</Text>
    <Button variant="primary" onClick="">Open details</Button>
  </VStack>
</Card>`,
  },
  {
    group: 'Forms',
    name: 'TextInput + Textarea',
    code: `<VStack gap="12" alignItems="stretch" maxWidth="md">
  <TextInput
    name="contact-email"
    type="email"
    iconBefore="envelope"
    placeholder="you@cetecerp.com"
  />
  <Textarea
    name="contact-notes"
    placeholder="Add implementation notes"
  />
  <Button variant="primary" onClick="">Submit</Button>
</VStack>`,
  },
  {
    group: 'Navigation',
    name: 'Breadcrumbs',
    code: `<VStack gap="8" alignItems="flex-start" maxWidth="lg">
  <Breadcrumbs
    items={[
      { id: 'home', label: 'Home', href: '#' },
      { id: 'orders', label: 'Orders', href: '#' },
      { id: 'order-10482', label: 'SO-10482' },
    ]}
  />
  <Heading level="h3">Sales Order SO-10482</Heading>
</VStack>`,
  },
  {
    group: 'Status',
    name: 'Tag + Badge',
    code: `<HStack gap="8" alignItems="center">
  <Tag hue="green" variant="bold" iconBefore="check">Approved</Tag>
  <Tag hue="yellow" iconBefore="warning">Pending</Tag>
  <Badge count={12}>
    <Icon name="envelope" size="24" />
  </Badge>
</HStack>`,
  },
  {
    group: 'Identity',
    name: 'Avatar Variants',
    code: `<HStack gap="10" alignItems="center">
  <Avatar name="Jane Doe" size="lg" presence="online" />
  <Avatar
    name="Operations Bot"
    size="lg"
    shape="hexagon"
    status="approved"
  />
</HStack>`,
  },
];

export default snippets;
