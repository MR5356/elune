<script setup>
import { ref } from 'vue'
import {
  addMachine,
  listMachine,
  listMachineGroup,
  addMachineGroup,
  updateMachine,
  deleteMachine
} from '@/request/devops'
import { MoreOne } from '@icon-park/vue-next'
import withLoading from '@/utils/loading'
import { ElMessageBox } from 'element-plus'

const machines = ref([])
const rawMachines = ref([])
const newMachine = ref()
const showAddMachine = ref(false)
const isEdit = ref(false)
const machineGroups = ref()

async function onClickEditMachine(machine) {
  isEdit.value = true
  newMachine.value = JSON.parse(JSON.stringify(machine))
  newMachine.value.hostInfo.password = ''
  showAddMachine.value = true
}

async function onClickAddMachine() {
  isEdit.value = false
  machineGroups.value = await withLoading(listMachineGroup)
  newMachine.value = {
    title: '',
    desc: '',
    groupId: machineGroups.value[0].id,
    hostInfo: {
      host: '',
      port: 22,
      username: 'root',
      password: ''
    }
  }
  showAddMachine.value = true
}

async function onSubmitMachine() {
  await withLoading(async () => {
    let g = machineGroups.value.find((item) => item.id === newMachine.value.groupId)
    if (!g) {
      await addMachineGroup({ title: newMachine.value.groupId })
      machineGroups.value = await listMachineGroup()
      g = machineGroups.value.find((item) => item.title === newMachine.value.groupId)
      newMachine.value.groupId = g.id
    }
    if (!newMachine.value.desc) {
      newMachine.value.desc = `${newMachine.value.hostInfo.username}@${newMachine.value.hostInfo.host}:${newMachine.value.hostInfo.port}`
    }
    if (!isEdit.value) {
      await addMachine(newMachine.value)
    } else {
      await updateMachine(newMachine.value)
    }
    showAddMachine.value = false
  }, '添加中')
  await init()
}

async function onDeleteMachine(id) {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await withLoading(deleteMachine, '删除中', id)
    await init()
  })
}

async function init() {
  machineGroups.value = await withLoading(listMachineGroup)
  rawMachines.value = await withLoading(listMachine)
  machines.value = rawMachines.value
  machines.value.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
}

init()

const infos = {
  system: {
    debian:
      "data:image/svg+xml,%3Csvg width='2019' height='2500' viewBox='0 0 256 317' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid'%3E%3Cg fill='%23A80030'%3E%3Cpath d='M152.797 167.425c-5.251.073.993 2.706 7.848 3.761a70.171 70.171 0 0 0 5.143-4.43c-4.269 1.046-8.614 1.07-12.991.67M180.98 160.4c3.127-4.315 5.406-9.04 6.21-13.926-.702 3.483-2.593 6.49-4.372 9.663-9.815 6.18-.923-3.67-.006-7.413-10.554 13.284-1.45 7.966-1.832 11.677M191.382 133.33c.635-9.455-1.86-6.466-2.7-2.857.98.508 1.754 6.665 2.7 2.858M132.886 4.088c2.802.503 6.054.888 5.598 1.557 3.066-.672 3.761-1.291-5.598-1.557M138.484 5.645l-1.98.41 1.843-.164.137-.246'/%3E%3Cpath d='M225.866 136.916c.312 8.492-2.484 12.612-5.006 19.905l-4.538 2.268c-3.714 7.211.36 4.579-2.3 10.315-5.797 5.154-17.593 16.13-21.368 17.132-2.756-.062 1.867-3.253 2.472-4.503-7.761 5.33-6.227 8-18.097 11.238l-.347-.771c-29.274 13.771-69.937-13.52-69.402-50.76-.313 2.364-.889 1.774-1.537 2.73-1.511-19.16 8.848-38.405 26.319-46.262 17.088-8.46 37.122-4.988 49.362 6.42-6.724-8.808-20.107-18.144-35.968-17.27-15.536.245-30.07 10.12-34.921 20.837-7.96 5.012-8.883 19.318-12.352 21.936-4.666 34.296 8.778 49.114 31.52 66.544 3.58 2.414 1.009 2.78 1.494 4.617-7.557-3.539-14.476-8.88-20.165-15.42 3.018 4.419 6.276 8.714 10.487 12.089-7.124-2.414-16.641-17.264-19.42-17.868 12.281 21.988 49.827 38.562 69.486 30.34-9.096.335-20.653.186-30.874-3.592-4.293-2.209-10.13-6.785-9.088-7.641 26.83 10.023 54.546 7.591 77.762-11.02 5.906-4.599 12.358-12.424 14.222-12.532-2.808 4.222.48 2.03-1.677 5.76 5.885-9.491-2.557-3.864 6.083-16.39l3.191 4.394c-1.186-7.878 9.783-17.444 8.67-29.904 2.516-3.81 2.808 4.1.137 12.866 3.706-9.725.976-11.288 1.929-19.312 1.029 2.697 2.379 5.564 3.071 8.41-2.414-9.398 2.478-15.826 3.688-21.288-1.193-.528-3.726 4.156-4.305-6.945.085-4.822 1.342-2.528 1.827-3.714-.947-.544-3.43-4.24-4.941-11.33 1.095-1.665 2.927 4.32 4.418 4.565-.959-5.637-2.61-9.935-2.677-14.26-4.354-9.099-1.54 1.213-5.073-3.906-4.634-14.456 3.846-3.355 4.419-9.924 7.024 10.178 11.03 25.951 12.868 32.485-1.402-7.966-3.67-15.683-6.437-23.149 2.133.897-3.436-16.39 2.773-4.94-6.633-24.406-28.388-47.21-48.401-57.91 2.449 2.24 5.54 5.055 4.43 5.496-9.953-5.926-8.202-6.388-9.628-8.892-8.109-3.299-8.64.266-14.012.006-15.282-8.106-18.227-7.244-32.291-12.322l.64 2.99c-10.125-3.373-11.797 1.279-22.74.01-.666-.52 3.507-1.881 6.94-2.38-9.789 1.29-9.33-1.93-18.909.356 2.361-1.657 4.857-2.753 7.376-4.161-7.983.485-19.058 4.646-15.64.862-13.02 5.809-36.145 13.964-49.122 26.132l-.41-2.727c-5.945 7.14-25.93 21.32-27.522 30.565l-1.59.371c-3.094 5.24-5.096 11.177-7.55 16.568-4.047 6.896-5.932 2.654-5.356 3.735-7.96 16.138-11.914 29.7-15.33 40.821 2.435 3.638.059 21.9.98 36.517-3.998 72.187 50.662 142.275 110.41 158.458 8.757 3.132 21.78 3.012 32.858 3.334-13.07-3.738-14.76-1.981-27.49-6.42-9.185-4.325-11.198-9.263-17.702-14.908l2.574 4.55c-12.758-4.515-7.42-5.588-17.798-8.875l2.75-3.591c-4.135-.313-10.953-6.97-12.817-10.654l-4.523.178c-5.435-6.706-8.331-11.54-8.12-15.282l-1.462 2.603c-1.657-2.843-19.995-25.15-10.481-19.957-1.768-1.616-4.117-2.63-6.665-7.259l1.937-2.215c-4.579-5.89-8.427-13.441-8.135-15.957 2.443 3.299 4.138 3.915 5.815 4.48-11.563-28.69-12.211-1.581-20.969-29.204l1.853-.149c-1.42-2.139-2.282-4.462-3.425-6.74l.807-8.037c-8.325-9.625-2.33-40.926-1.128-58.093.832-6.98 6.948-14.412 11.6-26.065l-2.834-.488c5.417-9.45 30.933-37.952 42.75-36.485 5.724-7.19-1.137-.026-2.256-1.838 12.573-13.012 16.527-9.193 25.013-11.533 9.151-5.432-7.855 2.118-3.516-2.072 15.82-4.041 11.212-9.187 31.85-11.238 2.178 1.239-5.051 1.914-6.866 3.521 13.181-6.449 41.712-4.982 60.244 3.58 21.504 10.049 45.663 39.754 46.616 67.704l1.084.292c-.55 11.11 1.7 23.958-2.198 35.76l2.654-5.587'/%3E%3Cpath d='M95.483 174.634l-.736 3.682c3.45 4.687 6.189 9.765 10.595 13.43-3.17-6.19-5.525-8.746-9.859-17.112M103.642 174.313c-1.827-2.02-2.908-4.45-4.117-6.873 1.157 4.257 3.526 7.916 5.733 11.636l-1.616-4.763M248.003 142.936l-.771 1.934c-1.414 10.046-4.468 19.987-9.15 29.203 5.173-9.725 8.519-20.36 9.921-31.137M133.923 1.57c3.55-1.301 8.728-.714 12.495-1.57-4.91.412-9.795.657-14.62 1.28l2.125.29M9.282 67.847c.819 7.574-5.698 10.514 1.444 5.52 3.828-8.623-1.496-2.381-1.444-5.52M.89 102.9c1.645-5.049 1.943-8.082 2.572-11.004C-1.085 97.708 1.37 98.946.89 102.9'/%3E%3C/g%3E%3C/svg%3E",
    centos:
      "data:image/svg+xml,%3Csvg width='2500' height='2500' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid'%3E%3Cpath d='M107.86 118.641l9.229 9.177-9.229 9.175H42.901v30.571L3.286 127.818l39.615-39.08v29.903h64.96zm28.554-78.068h78.929v78.93h-78.929v-78.93z' fill='%23932279'/%3E%3Cpath d='M137.275 107.86l-9.175 9.229-9.175-9.229V42.901H88.352L128.1 3.286l39.077 39.615h-29.902v64.96zm-.86 28.554h78.928v78.93h-78.929v-78.93z' fill='%23EFA724'/%3E%3Cpath d='M148.057 137.275l-9.23-9.175 9.23-9.175h64.958V88.352l39.617 39.748-39.617 39.077v-29.902h-64.958zm-107.484-.86h78.929v78.93H40.573v-78.93z' fill='%23262577'/%3E%3Cpath d='M118.641 148.057l9.175-9.23 9.177 9.23v64.96h30.571l-39.748 39.615-39.076-39.615h29.901v-64.96zM40.573 40.573h78.929v78.93H40.573v-78.93z' fill='%239CCD2A'/%3E%3Cpath d='M37.754 37.754h84.567v84.567H37.754V37.754zm5.637 78.93h73.291V43.393H43.391v73.291zm90.206-78.93h84.567v84.567h-84.567V37.754zm5.637 78.93h73.291V43.393h-73.291v73.291zm-5.637 16.913h84.567v84.569h-84.567v-84.57zm5.637 78.928h73.291v-73.291h-73.291v73.291zm-101.48-78.928h84.567v84.569H37.754v-84.57zm5.637 78.928h73.291v-73.291H43.391v73.291z' fill='%23FFF'/%3E%3Cpath d='M60.188 187.758l-59.8-59.8L60.187 68.16l59.8 59.798-59.798 59.8zm-51.826-59.8l51.826 51.826 51.824-51.826-51.826-51.824-51.824 51.824zm119.596-7.972L68.16 60.188l59.798-59.8 59.798 59.8-59.798 59.798zM76.134 60.188l51.824 51.824 51.826-51.824-51.826-51.826-51.824 51.826zm119.596 127.57l-59.798-59.8L195.73 68.16l59.798 59.798-59.798 59.8zm-51.826-59.8l51.826 51.826 51.824-51.826-51.824-51.824-51.826 51.824zm-15.946 127.57L68.16 195.73l59.798-59.798 59.798 59.798-59.798 59.798zM76.134 195.73l51.824 51.824 51.826-51.824-51.826-51.824-51.824 51.824z' fill='%23FFF'/%3E%3C/svg%3E",
    raspberrypi:
      "data:image/svg+xml,%3Csvg width='1957' height='2500' viewBox='0 0 256 327' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet'%3E%3Cpath d='M69.298.005c-1.653.051-3.433.662-5.453 2.255C58.9.353 54.102-.31 49.813 3.573c-6.623-.859-8.775.914-10.406 2.984-1.454-.03-10.879-1.495-15.202 4.953C13.343 10.225 9.91 17.899 13.8 25.056c-2.219 3.434-4.518 6.827.67 13.375-1.835 3.646-.697 7.602 3.626 12.389-1.14 5.127 1.102 8.743 5.125 11.562-.753 7.015 6.433 11.094 8.578 12.547.824 4.087 2.541 7.945 10.748 10.077 1.354 6.092 6.286 7.144 11.063 8.422-15.787 9.177-29.325 21.25-29.233 50.875l-2.313 4.125c-18.102 11.008-34.388 46.39-8.92 75.148 1.663 9.002 4.453 15.468 6.937 22.624 3.715 28.836 27.962 42.339 34.358 43.936 9.371 7.138 19.352 13.911 32.86 18.656 12.731 13.131 26.525 18.136 40.394 18.128.204 0 28.277-4.996 41.01-18.128 13.506-4.745 23.487-11.518 32.86-18.656 6.394-1.597 30.641-15.1 34.356-43.936 2.484-7.156 5.274-13.622 6.938-22.624 25.466-28.761 9.181-64.144-8.92-75.152l-2.317-4.125c.092-29.622-13.446-41.696-29.233-50.875 4.776-1.278 9.71-2.33 11.062-8.422 8.207-2.133 9.925-5.99 10.748-10.077 2.146-1.453 9.331-5.532 8.58-12.547 4.021-2.819 6.264-6.436 5.123-11.562 4.324-4.787 5.461-8.743 3.626-12.39 5.19-6.544 2.887-9.937.671-13.371 3.888-7.157.457-14.832-10.409-13.546-4.32-6.448-13.744-4.984-15.202-4.954-1.63-2.069-3.782-3.842-10.405-2.983-4.289-3.883-9.085-3.221-14.032-1.313-5.874-4.635-9.76-.92-14.2.485-7.112-2.324-8.739.859-12.233 2.156-7.756-1.639-10.113 1.929-13.83 5.695l-4.326-.086c-11.698 6.894-17.51 20.932-19.57 28.149-2.06-7.218-7.859-21.256-19.555-28.149l-4.325.086c-3.723-3.766-6.079-7.334-13.835-5.695C86.78 3.603 85.16.42 78.042 2.744c-2.914-.922-5.594-2.838-8.749-2.74L-11 141'/%3E%3Cpath d='M46.008 30.334c31.036 16.001 49.079 28.945 58.964 39.969-5.062 20.289-31.47 21.215-41.126 20.646 1.977-.92 3.627-2.023 4.212-3.716-2.423-1.722-11.014-.182-17.012-3.551 2.304-.478 3.382-.943 4.459-2.643-5.666-1.807-11.77-3.365-15.36-6.359 1.937.024 3.746.434 6.276-1.321-5.075-2.735-10.491-4.903-14.699-9.084 2.624-.064 5.453-.026 6.276-.991-4.645-2.878-8.565-6.078-11.809-9.579 3.672.443 5.223.062 6.111-.578-3.512-3.597-7.956-6.634-10.075-11.066 2.726.94 5.221 1.3 7.019-.082-1.193-2.692-6.305-4.28-9.249-10.571 2.871.279 5.915.626 6.524 0-1.332-5.428-3.618-8.48-5.86-11.642 6.143-.091 15.451.024 15.03-.495L31.89 15.39c6.001-1.616 12.141.259 16.599 1.651 2.001-1.579-.036-3.576-2.478-5.615 5.1.681 9.708 1.853 13.874 3.468 2.225-2.009-1.445-4.019-3.221-6.028 7.879 1.494 11.217 3.595 14.534 5.698 2.407-2.307.138-4.268-1.486-6.276 5.941 2.2 9.001 5.041 12.222 7.845 1.092-1.474 2.775-2.555.743-6.111 4.218 2.431 7.395 5.296 9.745 8.506 2.61-1.662 1.555-3.934 1.569-6.029 4.384 3.566 7.166 7.361 10.571 11.066.686-.5 1.286-2.193 1.817-4.872 10.457 10.145 25.234 35.7 3.798 45.832-18.243-15.046-40.031-25.983-64.176-34.187l.007-.004M210.686 30.334c-31.032 16.003-49.075 28.943-58.959 39.969 5.062 20.289 31.469 21.215 41.125 20.646-1.977-.92-3.627-2.023-4.211-3.716 2.423-1.722 11.014-.182 17.011-3.551-2.304-.478-3.381-.943-4.459-2.643 5.667-1.807 11.771-3.365 15.36-6.359-1.937.024-3.746.434-6.276-1.321 5.076-2.735 10.492-4.903 14.7-9.084-2.625-.064-5.454-.026-6.276-.991 4.645-2.878 8.565-6.078 11.809-9.579-3.673.443-5.223.062-6.111-.578 3.511-3.597 7.956-6.634 10.075-11.066-2.727.94-5.222 1.3-7.02-.082 1.193-2.692 6.306-4.28 9.249-10.571-2.87.279-5.915.626-6.524 0 1.335-5.43 3.621-8.482 5.863-11.644-6.143-.091-15.451.024-15.03-.495l3.799-3.882c-6.001-1.615-12.141.26-16.599 1.652-2.001-1.579.035-3.576 2.477-5.615-5.099.68-9.708 1.853-13.873 3.468-2.226-2.009 1.445-4.019 3.221-6.028-7.879 1.494-11.217 3.595-14.535 5.698-2.407-2.307-.137-4.268 1.487-6.276-5.941 2.2-9.001 5.041-12.222 7.845-1.093-1.474-2.775-2.555-.744-6.111-4.217 2.431-7.394 5.296-9.744 8.506-2.61-1.662-1.555-3.935-1.569-6.029-4.384 3.566-7.166 7.36-10.571 11.066-.686-.5-1.286-2.193-1.817-4.873-10.457 10.146-25.234 35.701-3.798 45.833 18.233-15.05 40.02-25.985 64.166-34.189h-.004' fill='%2375A928'/%3E%3Cpath d='M165.933 236.933c.108 18.933-16.449 34.362-36.98 34.461-20.532.1-37.264-15.167-37.372-34.1a21.72 21.72 0 0 1 0-.361c-.108-18.932 16.448-34.361 36.98-34.461 20.532-.1 37.263 15.167 37.372 34.1v.361M107.246 139.004c15.404 10.093 18.181 32.969 6.202 51.095-11.979 18.127-34.177 24.641-49.581 14.549-15.404-10.093-18.18-32.969-6.202-51.095 11.979-18.127 34.177-24.641 49.581-14.549M148.822 137.177c-15.403 10.092-18.18 32.969-6.202 51.095 11.979 18.127 34.177 24.641 49.581 14.548 15.404-10.092 18.181-32.968 6.202-51.095-11.978-18.126-34.176-24.64-49.581-14.548M30.258 155.504c16.631-4.458 5.615 68.803-7.917 62.792-14.885-11.972-19.679-47.033 7.917-62.792M222.453 154.591c-16.633-4.457-5.615 68.807 7.917 62.796 14.885-11.973 19.679-47.038-7.917-62.796M165.946 100.034c28.701-4.846 52.583 12.206 51.619 43.328-.944 11.932-62.193-41.551-51.619-43.328M86.646 99.121c-28.703-4.847-52.583 12.209-51.619 43.329.944 11.931 62.194-41.552 51.619-43.329M127.874 91.863c-17.13-.446-33.57 12.713-33.61 20.346-.047 9.274 13.544 18.77 33.727 19.011 20.61.147 33.762-7.601 33.828-17.172.076-10.844-18.745-22.353-33.945-22.186v.001M128.92 282.043c14.935-.652 34.975 4.81 35.015 12.057.248 7.036-18.175 22.934-36.005 22.627-18.466.797-36.573-15.126-36.336-20.645-.277-8.092 22.484-14.41 37.326-14.039M73.756 239.098c10.633 12.81 15.481 35.316 6.607 41.951-8.395 5.065-28.782 2.979-43.272-17.838-9.773-17.468-8.514-35.243-1.652-40.465 10.261-6.25 26.115 2.193 38.318 16.352h-.001M181.956 235.037c-11.505 13.475-17.911 38.053-9.519 45.969 8.025 6.15 29.567 5.29 45.479-16.789 11.554-14.829 7.683-39.594 1.083-46.17-9.804-7.583-23.879 2.122-37.043 16.986v.004' fill='%23BC1142'/%3E%3C/svg%3E",
    kylin:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaCAIAAAD8YgW4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuYThkNDc1MzQ5LCAyMDIzLzAzLzIzLTEzOjA1OjQ1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTEtMjhUMTQ6NDc6MzQrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTExLTI4VDE0OjUzOjE0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTI4VDE0OjUzOjE0KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDJhMTI4NS0zYWZmLTQxMjQtYTg2NC04MjYxZDY1ZThhYjMiIHhtcE1NOkRvY3VtZW50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',
    unknown:
      'data:image/png;base64,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'
  }
}

function filterMachineData(groupId) {
  if (groupId === '0') {
    machines.value = rawMachines.value
  } else {
    machines.value = rawMachines.value.filter((item) => `${item.groupId}` === groupId)
  }
}
</script>

<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto rounded-lg bg-white bg-opacity-0 z-10 mb-4 pr-4"
  >
    <div class="font-medium text-xl mb-6">主机管理</div>
    <div class="overflow-auto">
      <el-menu
        default-active="0"
        background-color="transparent"
        mode="horizontal"
        :ellipsis="false"
        v-if="machineGroups"
        @select="
          (e) => {
            filterMachineData(e)
          }
        "
      >
        <el-menu-item index="0">全部</el-menu-item>
        <template v-for="mg in machineGroups" :key="mg.id">
          <el-menu-item v-if="mg?.machines.length > 0" :index="`${mg.id}`">{{
            mg.title
          }}</el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div
        class="bg-white bg-opacity-50 rounded-lg shadow p-8 flex justify-between gap-2 sm:p-4 md:p-4 lg:p-6 relative"
        v-for="machine in machines"
        :key="machine.id"
      >
        <div class="flex gap-2">
          <div
            class="h-[2.5rem] w-[2.5rem] min-w-[2.5rem] min-h-[2.5rem] max-w-[2.5rem] max-h-[2.5rem] p-0 rounded-md"
          >
            <img
              :src="infos.system[machine.metaInfo.os]"
              class="w-full h-full rounded-md stroke-gray-400"
              alt="logo"
            />
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <div class="font-bold text-sm">
                {{ machine.title
                }}<span
                  class="ml-2 font-normal text-xs bg-slate-100 rounded-full px-2 p-[2px] text-gray-500"
                  >{{ machine.group.title }}</span
                >
              </div>
              <div class="text-xs text-gray-500">
                {{ machine.desc }}
              </div>
            </div>
            <div class="flex gap-2 text-xs text-sky-700 flex-wrap">
              <div class="bg-sky-100 rounded-full px-2 py-[2px]">
                {{ machine.metaInfo.hostname }}
              </div>
              <div class="bg-sky-100 rounded-full px-2 py-[2px]">{{ machine.metaInfo.os }}</div>
              <div class="bg-sky-100 rounded-full px-2 py-[2px]">{{ machine.metaInfo.arch }}</div>
              <div class="bg-sky-100 rounded-full px-2 py-[2px]">{{ machine.metaInfo.kernel }}</div>
              <div class="bg-sky-100 rounded-full px-2 py-[2px]">
                {{ machine.metaInfo.cpu }}核心 {{ machine.metaInfo.mem }}内存
              </div>
            </div>
          </div>
        </div>
        <div>
          <el-popover :width="88" trigger="hover" class="p-0">
            <template #reference>
              <MoreOne />
            </template>
            <template #default>
              <div class="flex flex-col gap-0 text-sm">
                <div
                  class="w-full hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                  @click="onClickEditMachine(machine)"
                >
                  编辑
                </div>
                <div
                  class="w-full hover:bg-gray-50 p-1.5 rounded cursor-pointer"
                  @click="onDeleteMachine(machine.id)"
                >
                  删除
                </div>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
      <div
        class="bg-white bg-opacity-50 rounded-lg shadow p-8 flex flex-col gap-2 sm:p-4 md:p-4 lg:p-6 relative cursor-pointer"
        @click="onClickAddMachine"
      >
        <div class="m-auto flex items-center gap-6">
          <div
            class="h-[3rem] w-[3rem] min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem] p-0 rounded-md"
          >
            <img
              class="w-full h-full rounded-md stroke-gray-400"
              src="data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24.0605 10L24.0239 38' stroke='%239da3ae' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10 24L38 24' stroke='%239da3ae' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
              alt="logo"
            />
          </div>
          <div class="text-xl text-gray-400">添加主机</div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="showAddMachine"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    class="max-w-[600px] min-w-[420px]"
    :title="isEdit ? '编辑主机' : '添加主机'"
  >
    <el-form :model="newMachine">
      <el-form-item label="主机名称">
        <el-input v-model="newMachine.title" />
      </el-form-item>
      <el-form-item label="主机地址">
        <el-input v-model="newMachine.hostInfo.host" />
      </el-form-item>
      <el-form-item label="主机端口">
        <el-input-number :min="1" :max="65535" :step="1" v-model="newMachine.hostInfo.port" />
      </el-form-item>
      <el-form-item label="登录用户">
        <el-input v-model="newMachine.hostInfo.username" />
      </el-form-item>
      <el-form-item label="主机密码">
        <el-input
          type="password"
          autocomplete="new-password"
          v-model="newMachine.hostInfo.password"
        />
      </el-form-item>
      <el-form-item label="主机简介">
        <el-input v-model="newMachine.desc" />
      </el-form-item>
      <el-form-item label="主机分组">
        <el-select
          v-model="newMachine.groupId"
          placeholder="选择分组"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="group in machineGroups"
            :key="group.id"
            :label="group.title"
            :value="group.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="showAddMachine = false">取消</el-button>
        <el-button type="primary" @click="onSubmitMachine">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  color: rgba(75, 85, 99, 0.7);
}
:deep(.el-form-item) {
  margin-bottom: 8px;
}
:deep(.el-input__inner) {
  font-size: 0.8rem;
}
.el-menu {
  border: 0 !important;
}

.el-menu-item {
  border: 0 !important;
  padding: 0 10px !important;
  &.is-active,
  &:hover {
    background: transparent !important;
    color: #0a0a0a !important;
    font-weight: bold !important;
    animation: jump 0.5s;
  }
}
</style>
