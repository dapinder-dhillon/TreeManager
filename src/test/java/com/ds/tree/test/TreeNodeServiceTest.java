package com.ds.tree.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ds.tree.service.TreeNodeService;
import com.ds.tree.test.config.TestConfig;
import com.ds.tree.vo.TreeNodeVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { TestConfig.class })
@EnableJpaRepositories(basePackages = "com.ds.tree.repository")
public class TreeNodeServiceTest {

	private static final int CEO_ID = 100;
	private static final int CTO_ID = 101;
	private static final int CFO_ID = 102;
	private static final int DEV_1_ID = 103;
	private static final int DEV_2_ID = 104;

	@Autowired
	private TreeNodeService treeNodeService;

	@Test
	public void saveAndFindNodes() {
		final TreeNodeVO treeNode = new TreeNodeVO();
		treeNode.setId(100);
		treeNode.setParentId(101);
		treeNode.setText("Test Node");

		treeNodeService.save(treeNode);

		final List<TreeNodeVO> treeNodeList = treeNodeService.findAllNodes();
		assertNotNull(treeNodeList);
	}

	@Test
	public void removeNode() {

		final TreeNodeVO ceo = new TreeNodeVO();
		ceo.setId(CEO_ID);
		ceo.setParentId(-1);
		ceo.setText("ceo");
		treeNodeService.save(ceo);

		final TreeNodeVO cto = new TreeNodeVO();
		cto.setId(CTO_ID);
		cto.setParentId(100);
		cto.setText("cto");
		treeNodeService.save(cto);

		final TreeNodeVO cfo = new TreeNodeVO();
		cfo.setId(CFO_ID);
		cfo.setParentId(100);
		cfo.setText("cfo");
		treeNodeService.save(cfo);

		final TreeNodeVO dev1 = new TreeNodeVO();
		dev1.setId(DEV_1_ID);
		dev1.setParentId(101);
		dev1.setText("dev1");
		treeNodeService.save(dev1);

		final TreeNodeVO dev2 = new TreeNodeVO();
		dev2.setId(DEV_2_ID);
		dev2.setParentId(101);
		dev2.setText("dev2");
		treeNodeService.save(dev2);

		// remove cto, CTO's children have new parent CEO
		treeNodeService.removeNode(101);

		final List<TreeNodeVO> allNodes = treeNodeService.findAllNodes();
		for (final TreeNodeVO treeNodeVO : allNodes) {
			if (treeNodeVO.getId() == DEV_1_ID) {
				assertEquals(treeNodeVO.getParentId(), Integer.valueOf(CEO_ID));
			}
			if (treeNodeVO.getId() == DEV_2_ID) {
				assertEquals(treeNodeVO.getParentId(), Integer.valueOf(CEO_ID));
			}
		}
	}
}
