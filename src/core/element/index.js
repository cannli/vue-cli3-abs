import Vue from 'vue'

import {
  Alert,
  Autocomplete,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  DatePicker,
  Dialog,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  InputNumber,
  Link,
  Loading,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Option,
  PageHeader,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  Row,
  Select,
  Slider,
  Step,
  Steps,
  Submenu,
  Switch,
  Scrollbar,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Tooltip,
  Tree,
  Upload,
  Image
} from 'element-ui'
Vue.use(Scrollbar)
Vue.use(PageHeader)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
// Vue.use(RadioButton);
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
// Vue.use(OptionGroup);
Vue.use(Button)
// Vue.use(ButtonGroup);
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
// Vue.use(Icon);
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
// Vue.use(Progress);
Vue.use(Badge)
// Vue.use(Card);
// Vue.use(Rate);
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
// Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);
Vue.use(Image)
Vue.use(Loading)
Vue.use(Link)
Vue.use(Backtop)

// Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message
Vue.prototype.$ELEMENT = {size: 'small'}
