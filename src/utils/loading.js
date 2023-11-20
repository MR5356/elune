import { ElLoading } from 'element-plus'

async function withLoading(fn, title = '加载中', ...args) {
  const loading = ElLoading.service({
    lock: true,
    text: title,
    background: 'rgba(148, 163, 184, 0.5)',
    customClass: '',
    spinner:
      '<svg width="50" height="50" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg">\n' +
      '    <rect y="10" width="15" height="120" rx="6" fill="#376ad0">\n' +
      '        <animate attributeName="height"\n' +
      '             begin="0.5s" dur="1s"\n' +
      '             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '        <animate attributeName="y"\n' +
      '             begin="0.5s" dur="1s"\n' +
      '             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '    </rect>\n' +
      '    <rect x="30" y="10" width="15" height="120" rx="6" fill="#62b7e2">\n' +
      '        <animate attributeName="height"\n' +
      '             begin="0.25s" dur="1s"\n' +
      '             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '        <animate attributeName="y"\n' +
      '             begin="0.25s" dur="1s"\n' +
      '             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '    </rect>\n' +
      '    <rect x="60" width="15" height="140" rx="6" fill="#c4ebf7">\n' +
      '        <animate attributeName="height"\n' +
      '             begin="0s" dur="1s"\n' +
      '             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '        <animate attributeName="y"\n' +
      '             begin="0s" dur="1s"\n' +
      '             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '    </rect>\n' +
      '    <rect x="90" y="10" width="15" height="120" rx="6" fill="#62b7e2">\n' +
      '        <animate attributeName="height"\n' +
      '             begin="0.25s" dur="1s"\n' +
      '             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '        <animate attributeName="y"\n' +
      '             begin="0.25s" dur="1s"\n' +
      '             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '    </rect>\n' +
      '    <rect x="120" y="10" width="15" height="120" rx="6" fill="#376ad0">\n' +
      '        <animate attributeName="height"\n' +
      '             begin="0.5s" dur="1s"\n' +
      '             values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '        <animate attributeName="y"\n' +
      '             begin="0.5s" dur="1s"\n' +
      '             values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"\n' +
      '             repeatCount="indefinite" />\n' +
      '    </rect>\n' +
      '</svg>'
  })
  try {
    let res = await fn(...args)
    loading.close()
    return res
  } catch (error) {
    console.log(error)
    loading.close()
  }
}

export default withLoading
